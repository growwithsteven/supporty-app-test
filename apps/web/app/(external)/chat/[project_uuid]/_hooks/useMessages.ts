import { Message } from "@/types/message";
import { Nilable } from "@/types/utils";
import { useState } from "react";
import { useMemo } from "react";

export type StoredMessage = Pick<
  Message,
  "sender" | "text" | "created_at" | "type"
> & {
  realTimeReceived?: true;
};

export type MessageForDisplay = Omit<StoredMessage, "type"> & {
  type: Exclude<Message["type"], "contact_res">;
};

export function useMessages() {
  const [messages, setMessages] = useState<StoredMessage[]>([]);

  return useMemo(
    () => ({
      data: messages.filter((x) => x.type !== "contact_res"),
      init(_messages?: Nilable<MessageForDisplay[]>) {
        setMessages(_messages ?? []);
      },
      addByUser(params: Pick<MessageForDisplay, "text" | "type">) {
        setMessages((prev) => [
          ...prev,
          { sender: "user", ...params, created_at: new Date().toISOString() },
        ]);
      },
      addByProject(params: Pick<MessageForDisplay, "text" | "type">) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "project",
            ...params,
            realTimeReceived: true,
            created_at: new Date().toISOString(),
          },
        ]);
      },
    }),
    [messages, setMessages],
  );
}
