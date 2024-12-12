import {
  useEffect,
  useState,
  useMemo,
  HTMLAttributes,
  ComponentProps,
} from "react";
import MessageBubble from "./MessageBubble";
import { cn } from "@/lib/cn";
import { OmitPropsOf } from "@/types/utils";

export default function OutputMessage(
  props: OmitPropsOf<typeof MessageBubble, "bound" | "className">,
) {
  return (
    <MessageBubble
      {...props}
      bound="in"
      className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    />
  );
}

OutputMessage.System = function SystemMessage({
  children,
  realTime,
  last,
  followUp,
  sendAt,
}: ComponentProps<typeof OutputMessage> & {
  children: string;
  realTime?: boolean;
  last?: boolean;
  followUp?: React.ReactNode;
}) {
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const animateEnabled = realTime && typeof children === "string" && last;
  const animateFinished = displayedIndex === children.length;

  useEffect(() => {
    async function animate(result: string) {
      for (let i = 0; i < result.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 15));
        setDisplayedIndex(i + 1);
      }
    }

    if (animateEnabled) {
      animate(String(children).trim());
    }
  }, [children, animateEnabled]);

  const renderProps: HTMLAttributes<HTMLDivElement> = useMemo(() => {
    if (!animateEnabled) {
      return { children };
    }

    return {
      dangerouslySetInnerHTML: {
        __html: `${children.slice(0, displayedIndex)}<span class="opacity-0">${children.slice(displayedIndex)}</span>`,
      },
    };
  }, [children, animateEnabled, displayedIndex]);

  return (
    <>
      <OutputMessage sendAt={sendAt}>
        <div {...renderProps} />
      </OutputMessage>
      {last && (
        <div
          className={cn(
            "transition-opacity duration-300 ease-in",
            animateFinished || !animateEnabled ? "opacity-100" : "opacity-0",
          )}
        >
          {followUp}
        </div>
      )}
    </>
  );
};
