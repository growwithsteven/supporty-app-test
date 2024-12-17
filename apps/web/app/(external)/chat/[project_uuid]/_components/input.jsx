"use client";

import { FaRegPaperPlane } from "react-icons/fa6";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { cn } from "@/lib/cn";

export default function Input({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim().length > 0) {
      onSend?.(text);
      setText("");
    }
  };

  return (
    <div className="flex items-center w-full rounded-2xl bg-gray-200 py-2 px-4 text-gray-500 dark:bg-gray-700 dark:text-gray-200">
      <TextareaAutosize
        className="w-full resize-none bg-transparent outline-none placeholder:text-gray-400"
        maxRows={5}
        autoFocus
        value={text}
        placeholder="Type your message."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handleSend(text);
          }
        }}
      />
      <button
        onClick={handleSend}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all enabled:hover:bg-gray-300 dark:enabled:hover:bg-gray-600"
        disabled={text.trim().length === 0}
      >
        <FaRegPaperPlane className={cn("text-gray-500 dark:text-gray-200")} />
      </button>
    </div>
  );
}
