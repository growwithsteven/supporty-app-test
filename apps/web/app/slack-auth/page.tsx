import { useRouter } from "next/router";
import { SLACK_OAUTH_URL } from "../(home)/(main)/_components/add-to-slack-button";
import { useEffect } from "react";

export default function SlackAuthPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(SLACK_OAUTH_URL);
  }, []);

  return <div>Waiting for Slack to authorize...</div>;
}
