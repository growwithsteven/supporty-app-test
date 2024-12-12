import { createSupabaseWithServiceRole } from "@/lib/supabase";
import { verifyTokenFromAuthorization } from "@/lib/token";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

  await supabase
    .from("messages")
    .update({ payload })
    .eq("chat_id", chat.id)
    .eq("sender", "project")
    .eq("type", "contact_req")
    .single();

  return NextResponse.json({ message: "Contact info saved" }, { status: 200 });
}
