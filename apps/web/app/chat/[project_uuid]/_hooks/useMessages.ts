import { Message } from "@/types/message";
import { Nilable } from "@/types/utils";
import { useState } from "react";
import { useMemo } from "react";

export type MessageForDisplay = Pick<Message, "sender" | "text"> & {
  realTimeReceived?: true;
};

export function useMessages() {
  const [messages, setMessages] = useState<MessageForDisplay[]>([]);

  return useMemo(
    () => ({
      data: messages,
      init(_messages: Nilable<MessageForDisplay[]>) {
        setMessages(_messages ?? []);
      },
      addByUser(text: string) {
        setMessages((prev) => [...prev, { sender: "user", text }]);
      },
      addByProject(text: string) {
        setMessages((prev) => [
          ...prev,
          { sender: "project", text, realTimeReceived: true },
        ]);
      },
    }),
    [messages, setMessages],
  );
}
