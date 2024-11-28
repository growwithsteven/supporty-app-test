export default function AddToSlackButton() {
  return (
    <a href="https://slack.com/oauth/v2/authorize?client_id=7986376791856.7960741430069&scope=channels:history,channels:join,chat:write,incoming-webhook,groups:history&user_scope=">
      <img
        alt="Add to Slack"
        height="40"
        width="139"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      />
    </a>
  )
}
