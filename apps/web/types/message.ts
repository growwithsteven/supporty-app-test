import type { Nilable, ValueOf } from "./utils";

export const MessageSender = {
  project: "project",
  user: "user",
} as const;
export type MessageSender = ValueOf<typeof MessageSender>;

export const MessageType = {
  default: "default",
  contact_req: "contact_req",
  contact_res: "contact_res",
  faq: "faq",
} as const;
export type MessageType = ValueOf<typeof MessageType>;

export interface Message {
  id: number;
  chat_id: number;
  project_uuid: string;

  type: MessageType;
  sender: MessageSender;

  text: string;
  internalText?: Nilable<string>;
  payload?: Nilable<ContactReqPayload>;

  created_at: string;
}

export type ContactReqPayload = {
  phoneNumber: string;
  email: string;
};
