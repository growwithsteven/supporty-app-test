import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  bound: "in" | "out";
  containerClassName?: string;
}

export default function MessageBubble({
  bound,
  containerClassName,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "chat",
        bound === "in" ? "chat-start" : "chat-end",
        containerClassName,
      )}
    >
      <div
        className={cn("chat-bubble leading-relaxed", className)}
        {...props}
      />
    </div>
  );
}
