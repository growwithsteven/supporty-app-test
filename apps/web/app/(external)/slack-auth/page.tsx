"use client";

import { SLACK_OAUTH_URL } from "@/src/components/StartButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SlackAuthPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(SLACK_OAUTH_URL);
  }, []);

  return <div>Waiting for Slack to authorize...</div>;
}
