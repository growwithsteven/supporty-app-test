import axios from "axios";
import { createSupabaseUser } from "@/lib/supabase";
import { ContactReqPayload, Message } from "@/types/message";

const client = axios.create({
  baseURL: "/api",
});

client.interceptors.request.use(async (config) => {
  const supabase = createSupabaseUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    config.headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return config;
});

type SendMessageParams = Pick<Message, "text" | "internalText" | "type"> & {
  projectUuid: string;
};

export async function sendMessage(params: SendMessageParams) {
  return client.post("/messages", params);
}

export async function saveSystemMessage(
  params: Omit<SendMessageParams, "internalText">,
) {
  return client.post("/messages/system", params);
}

export async function saveContactInfo(params: {
  projectUuid: string;
  payload: ContactReqPayload;
}) {
  return client.post("/messages/system/contact_req", params);
}

export async function disableChat(params: { projectUuid: string }) {
  return client.post("/chats/disable", params);
}
