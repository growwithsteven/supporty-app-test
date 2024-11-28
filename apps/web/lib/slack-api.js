import axios from 'axios'

export async function oauthAccess(code) {
  return axios.post(
    'https://slack.com/api/oauth.v2.access',
    new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code,
    }),
  )
}

export async function getChannelHistory({
  accessToken,
  channel,
  oldest,
  latest,
}) {
  return axios.get(
    `https://slack.com/api/conversations.history?channel=${channel}&oldest=${oldest}&latest=${latest}&limit=1&inclusive=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export async function joinChannel({ accessToken, channel }) {
  return axios.post(
    'https://slack.com/api/conversations.join',
    { channel },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export async function postMessage({ accessToken, channel, ...rest }) {
  return axios.post(
    'https://slack.com/api/chat.postMessage',
    { channel, ...rest },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
}

export async function postMessageToWebhook({ webhookUrl, ...rest }) {
  return axios.post(webhookUrl, { ...rest })
}
