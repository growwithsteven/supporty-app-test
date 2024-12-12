import MessageBubble from "./MessageBubble";

export default function InputMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MessageBubble
      bound="out"
      className="bg-blue-200 text-gray-800 dark:bg-blue-500 dark:text-gray-200"
    >
      {children}
    </MessageBubble>
  );
}
