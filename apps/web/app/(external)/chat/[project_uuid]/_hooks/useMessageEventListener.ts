import { useEffect } from "react";
import { z } from "zod";

type Handlers = {
  accessInfo: (data: AccessInfoEventData) => void;
};

export function useMessageEventListener(handlers: Handlers) {
  useEffect(() => {
    const handleEvent = (event: MessageEvent) => {
      try {
        const data = eventDataSchema.parse(event.data);

        if (data.type === eventTypeSchema.enum.ACCESS_INFO) {
          handlers.accessInfo(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);
}

const eventTypeSchema = z.enum(["ACCESS_INFO"]);

const accessInfoEventDataSchema = z.object({
  type: z.literal(eventTypeSchema.enum.ACCESS_INFO),
  title: z.string(),
  href: z.string(),
  platform: z.string().nullable(),
  browser: z.string(),
  referrer: z.string().nullable(),
});
export type AccessInfoEventData = z.infer<typeof accessInfoEventDataSchema>;

const eventDataSchema = z.union([accessInfoEventDataSchema, z.never()]);
