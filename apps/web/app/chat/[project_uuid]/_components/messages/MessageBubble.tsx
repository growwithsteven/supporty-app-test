import { cn } from "@/lib/cn";
import { format } from "date-fns";
import { HTMLAttributes, useState } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bound: "in" | "out";
  containerClassName?: string;
  sendAt?: Date;
}

export default function MessageBubble({
  bound,
  containerClassName,
  className,
  sendAt,
  ...props
}: Props) {
  const [isSendAtVisible, setIsSendAtVisible] = useState(false);

  const sendAtText = sendAt ? format(sendAt, "hh:mm a") : undefined;

  return (
    <div
      className="relative"
      onClick={() => {
        if (sendAt) setIsSendAtVisible(true);
      }}
    >
      <div
        className={cn(
          "chat",
          bound === "in" ? "chat-start" : "chat-end",
          containerClassName,
        )}
      >
        <div
          className={cn(
            "chat-bubble leading-relaxed whitespace-pre-wrap",
            className,
          )}
          {...props}
        />
      </div>
      {isSendAtVisible && (
        <div
          className={cn(
            "text-xs text-gray-500 dark:text-gray-400 px-3 mt-1",
            bound === "in" ? "text-left" : "text-right",
          )}
        >
          {sendAtText}
        </div>
      )}
    </div>
  );
}
