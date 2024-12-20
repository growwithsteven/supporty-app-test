import * as slackApi from "@/lib/slack-api";

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseWithServiceRole } from "@/lib/supabase";
import { verifyTokenFromAuthorization } from "@/lib/token";
import { AccessInfoEventData } from "@/app/(external)/chat/[project_uuid]/_hooks/useMessageEventListener";

export async function POST(req: NextRequest) {
  const { projectUuid, text, internalText, type, accessInfo } =
    await req.json();
  const supabase = createSupabaseWithServiceRole();
  const { sub: userId } = await verifyTokenFromAuthorization(
    req.headers.get("Authorization"),
  );

  // Get project
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("uuid", projectUuid)
    .maybeSingle();

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Get chat
  let { data: chat } = await supabase
    .from("chats")
    .select("*")
    .eq("project_uuid", projectUuid)
    .eq("user_id", userId)
    .is("disabled_at", null)
    .maybeSingle();

  if (!chat) {
    // Create chat if it doesn't exist
    const { data: newChat } = await supabase
      .from("chats")
      .insert({ project_uuid: projectUuid, user_id: userId })
      .select("*")
      .maybeSingle();

    if (!newChat) {
      return NextResponse.json(
        { error: "Failed to create chat" },
        { status: 400 },
      );
    }

    chat = newChat;
  }

  // Create message
  const { data: message } = await supabase
    .from("messages")
    .insert({
      chat_id: chat.id,
      project_uuid: projectUuid,
      sender: "user",
      text,
      internal_text: internalText,
      type,
    })
    .select("*")
    .single();

  // Validate thread_ts
  let threadTs = chat.thread_ts;
  if (threadTs) {
    const { data: historyChannelResponse } = await slackApi.getChannelHistory({
      accessToken: project.access_token,
      channel: project.channel_id,
      oldest: chat.thread_ts,
      latest: chat.thread_ts,
    });

    if (
      historyChannelResponse.error ||
      historyChannelResponse.messages.length === 0
    ) {
      threadTs = null;
    }
  }

  const isFirstMessage = threadTs == null;

  const messageText = isFirstMessage
    ? `*New conversation arrived!*\n💬: "${message.text}"\n_Reply in the thread to send a message to the user._`
    : (message.internal_text ?? message.text);

  // Send message to Slack
  const { data: postMessageData } = await slackApi.postMessage({
    accessToken: project.access_token,
    channel: project.channel_id,
    text: messageText,
    ...(threadTs && { thread_ts: threadTs }),
  });

  if (postMessageData.error) {
    return NextResponse.json(
      { error: "Failed to send message to Slack" },
      { status: 400 },
    );
  }

  if (isFirstMessage) {
    threadTs = postMessageData.message.ts;

    if (accessInfo != null) {
      try {
        await slackApi.postMessage({
          accessToken: project.access_token,
          channel: project.channel_id,
          text: getAccessInfoText(accessInfo),
          thread_ts: threadTs,
        });
      } catch (error) {
        console.error(error);
      }
    }

    // Update chat with thread_ts
    await supabase
      .from("chats")
      .update({
        thread_ts: threadTs,
        ...(accessInfo && { access_info: accessInfo }),
      })
      .eq("id", chat.id);
  }

  return NextResponse.json(message);
}

function getAccessInfoText(accessInfo: AccessInfoEventData) {
  const platformLabel = getPlatformLabel(accessInfo.platform);

  return `Access Information`
    .concat(`\n- URL: ${accessInfo.href}`)
    .concat(`\n- Page Title: "${accessInfo.title}"`)
    .concat(platformLabel != null ? `\n- OS: ${platformLabel}` : "")
    .concat(`\n- Browser: ${accessInfo.browser}`);
}

function getPlatformLabel(platform: string | null) {
  if (platform == null) {
    return null;
  }

  switch (platform) {
    case "iphone":
      return "iPhone";
    case "ipad":
      return "iPad";
    case "android":
      return "Android";
    case "mac":
      return "Mac";
    case "windows":
      return "Windows";
    default:
      return null;
  }
}
