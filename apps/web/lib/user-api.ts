import { createApiClient } from "@/lib/api-client";
import { ContactReqPayload, Message } from "@/types/message";
import { AccessInfoEventData } from "@/app/(external)/chat/[project_uuid]/_hooks/useMessageEventListener";

const client = createApiClient("user");

type SendMessageParams = Pick<Message, "text" | "internalText" | "type"> & {
  projectUuid: string;
  accessInfo?: AccessInfoEventData;
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
