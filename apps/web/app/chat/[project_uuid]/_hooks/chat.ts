import * as api from "@/lib/user-api";

import { createSupabaseUser } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useUserAuth } from "./user-auth";
import { Faq, Project, ProjectSettings } from "@/types/project";
import { ContactReqPayload, Message } from "@/types/message";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { MessageForDisplay, useMessages } from "./useMessages";
import { isNotNil } from "es-toolkit";
import { Nilable } from "@/types/utils";
import { isEmptyStringOrNil } from "@/lib/string";
import { assert } from "@toss/assert";

export function useChat(projectUuid: Project["uuid"]) {
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const [initialTime, setInitialTime] = useState<Nilable<Date>>(null);
  const [settings, setSettings] = useState<ProjectSettings | null>(null);

  const messages = useMessages();
  const { user, updateUser } = useUserAuth();

  const fetchMessages = async () => {
    if (!user) {
      return;
    }

    const supabase = createSupabaseUser();

    const { data: chat } = await supabase
      .from("chats")
      .select("id, created_at")
      .eq("project_uuid", projectUuid)
      .eq("user_id", user.id)
      .maybeSingle();

    setInitialTime(new Date(chat?.created_at ?? new Date()));

    if (chat) {
      const { data: _messages } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chat.id)
        .order("id", { ascending: true });

      messages.init(_messages);
    }

    setLoading(false);
  };

  const fetchSettings = async () => {
    const supabase = createSupabaseUser();
    const { data: projectDetail } = await supabase
      .from("project_details")
      .select("settings")
      .eq("project_uuid", projectUuid)
      .single();

    assert(projectDetail != null, "Project detail not found");

    setSettings(projectDetail.settings);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const supabase = createSupabaseUser();

    supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: "sender=eq.project",
        },
        (payload: RealtimePostgresInsertPayload<Message>) => {
          const message = payload.new;
          if (message.project_uuid === projectUuid) {
            messages.addByProject(message as MessageForDisplay);
          }
        },
      )
      .subscribe();

    fetchMessages();
    fetchSettings();

    return () => {
      supabase.removeAllChannels();
    };
  }, [user]);

  useEffect(() => {
    if (
      messages.data.length > 0 &&
      messages.data[messages.data.length - 1].sender === "project"
    ) {
      setIsTyping(false);
    }
  }, [messages]);

  // private

  const _saveUserMessage = (
    params: Pick<Message, "text" | "internalText" | "type">,
  ) => {
    api.sendMessage({ projectUuid, ...params }).catch(() => {
      console.error("Failed to save user message");
    });
  };

  /** 주의: messages.addByProject는 따로 하지 않고 channel로 수신한다 */
  const _saveSystemMessage = (
    params: Pick<Message, "text" | "type" | "payload">,
  ) => {
    api.saveSystemMessage({ projectUuid, ...params }).catch(() => {
      console.error("Failed to save system message");
    });
  };

  const _submitContactInfo = (payload: ContactReqPayload) => {
    api.saveContactInfo({ projectUuid, payload }).catch(() => {
      console.error("Failed to save system message");
    });

    updateUser({ email: payload.email, phone: payload.phoneNumber });
  };

  // public

  const handleSend = (text: string) => {
    const isFirstChatMessage =
      messages.data.filter((x) => x.type === "default").length === 0;

    const params = { text, type: "default" } as const;

    messages.addByUser(params);
    _saveUserMessage(params);

    if (isFirstChatMessage) {
      _saveSystemMessage({
        text: "contact_req",
        type: "contact_req",
        payload: { phoneNumber: "", email: "" },
      });
    }
  };

  const handleFaqSelect = (faq: Faq) => {
    const params = {
      text: faq.question,
      internalText: `[FAQ clicked] - ${faq.question}`,
      type: "faq",
    } as const;

    messages.addByUser(params);
    _saveUserMessage(params);

    setIsTyping(true);
    setTimeout(() => {
      _saveSystemMessage(params);
    }, 1500);
  };

  const handleContactReqSubmit = (payload: ContactReqPayload) => {
    _saveUserMessage({
      text: `[Contact Info Submitted] - ${payload.phoneNumber} - ${payload.email}`,
      type: "contact_res",
    });
    _submitContactInfo(payload);
  };

  const handleDisableChat = () => {
    toast.success("New Conversation Started");

    messages.init([]);
    api.disableChat({ projectUuid }).catch(() => {});
  };

  const welcomeMessage: Nilable<MessageForDisplay> = useMemo(
    () =>
      settings != null &&
      !isEmptyStringOrNil(settings.welcomeMessage) &&
      initialTime != null
        ? {
            type: "default",
            text: settings.welcomeMessage!,
            sender: "project",
            created_at: initialTime.toISOString(),
          }
        : null,
    [settings, initialTime],
  );

  return {
    loading,
    settings,
    messages: [welcomeMessage, ...messages.data].filter(isNotNil),

    handleSend,
    handleFaqSelect,
    handleContactReqSubmit,
    handleDisableChat,

    isTyping,
  };
}
