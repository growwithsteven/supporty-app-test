import { createSupabaseWithServiceRole } from "@/lib/supabase";
import { verifyTokenFromAuthorization } from "@/lib/token";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { projectUuid, text, type, payload } = await req.json();
  const supabase = createSupabaseWithServiceRole();
  const { sub: userId } = await verifyTokenFromAuthorization(
    req.headers.get("Authorization"),
  );

  const { data: chat } = await supabase
    .from("chats")
    .select("*")
    .eq("project_uuid", projectUuid)
    .eq("user_id", userId)
    .is("disabled_at", null)
    .maybeSingle();

  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  await supabase.from("messages").insert({
    chat_id: chat.id,
    project_uuid: chat.project_uuid,
    sender: "project",
    text: text,
    type: type,
    payload: payload,
  });

  return NextResponse.json({ message: "Message saved" }, { status: 200 });
}
