import { SlackIcon } from "../icons/slack";

const CLIENT_ID = "7986376791856.7960741430069";
const SCOPE =
  "channels:history,channels:join,chat:write,incoming-webhook,groups:history";

export const SLACK_OAUTH_URL = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&user_scope=`;

export function StartButton() {
  return (
    <a
      className="flex items-center gap-3 border rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-300 px-4 py-3"
      href={SLACK_OAUTH_URL}
    >
      <SlackIcon className="size-5" />
      <span className="font-medium text-sm text-white">Start Now</span>
    </a>
  );
}
