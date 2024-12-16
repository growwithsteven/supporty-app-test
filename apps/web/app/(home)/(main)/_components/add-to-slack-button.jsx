const CLIENT_ID = "7986376791856.7960741430069";
const SCOPE =
  "channels:history,channels:join,chat:write,incoming-webhook,groups:history";

export const SLACK_OAUTH_URL = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&user_scope=`;

export default function AddToSlackButton() {
  return (
    <a href={SLACK_OAUTH_URL}>
      <img
        alt="Add to Slack"
        height="40"
        width="139"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      />
    </a>
  );
}
