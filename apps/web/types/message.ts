import type { ValueOf } from "./utils";

export const MessageSender = {
  project: "project",
  user: "user",
} as const;
export type MessageSender = ValueOf<typeof MessageSender>;

export type MessageType = "default" | "contact_form";

export interface Message {
  id: number;
  chat_id: number;
  project_uuid: string;

  type: MessageType;
  sender: MessageSender;

  text: string;
  internalText: string | null;

  created_at: string;
}
