import MessageBubble from "./MessageBubble";
import { OmitPropsOf } from "@/types/utils";

export default function InputMessage(
  props: OmitPropsOf<typeof MessageBubble, "bound" | "className">,
) {
  return (
    <MessageBubble
      {...props}
      bound="out"
      className="bg-blue-200 text-gray-800 dark:bg-blue-500 dark:text-gray-200"
    />
  );
}
