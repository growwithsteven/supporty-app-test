import axios, { AxiosResponse } from "axios";
import { config } from "@/lib/config";

export interface SlackOAuthResponse {
  ok: boolean;
  access_token: string;
  token_type: string;
  scope: string;
  bot_user_id: string;
  app_id: string;
  team: {
    name: string;
    id: string;
  };
  enterprise: {
    name: string;
    id: string;
  } | null;
  authed_user: {
    id: string;
    scope: string;
    access_token: string;
    token_type: string;
  };
  incoming_webhook?: {
    url: string;
    channel: string;
    channel_id: string;
    configuration_url: string;
  };
  error?: string;
}

export interface SlackChannelHistoryResponse {
  ok: boolean;
  messages: Array<{
    type: string;
    user: string;
    text: string;
    ts: string;
    thread_ts?: string;
  }>;
  has_more: boolean;
  pin_count: number;
  channel_actions_ts: any;
  channel_actions_count: number;
  error?: string;
}

export interface SlackJoinChannelResponse {
  ok: boolean;
  channel: {
    id: string;
    name: string;
    is_channel: boolean;
    created: number;
    is_archived: boolean;
    is_general: boolean;
    unlinked: number;
    creator: string;
    name_normalized: string;
    is_shared: boolean;
    is_org_shared: boolean;
    is_member: boolean;
    is_private: boolean;
    is_mpim: boolean;
    last_read: string;
    latest: any;
    unread_count: number;
    unread_count_display: number;
    members: string[];
    topic: {
      value: string;
      creator: string;
      last_set: number;
    };
    purpose: {
      value: string;
      creator: string;
      last_set: number;
    };
    previous_names: string[];
    priority: number;
  };
  error?: string;
}

export interface SlackPostMessageResponse {
  ok: boolean;
  channel: string;
  ts: string;
  message: {
    bot_id: string;
    type: string;
    text: string;
    user: string;
    ts: string;
    app_id: string;
    team: string;
    bot_profile: any;
    thread_ts?: string;
  };
  error?: string;
}

export async function oauthAccess(
  code: string,
): Promise<AxiosResponse<SlackOAuthResponse>> {
  return axios.post(
    `${config.slackApiUrl}/oauth.v2.access`,
    new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code,
    }),
  );
}

export async function getChannelHistory({
  accessToken,
  channel,
  oldest,
  latest,
}: {
  accessToken: string;
  channel: string;
  oldest: string;
  latest: string;
}): Promise<AxiosResponse<SlackChannelHistoryResponse>> {
  return axios.get(
    `${config.slackApiUrl}/conversations.history?channel=${channel}&oldest=${oldest}&latest=${latest}&limit=1&inclusive=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export async function joinChannel({
  accessToken,
  channel,
}: {
  accessToken: string;
  channel: string;
}): Promise<AxiosResponse<SlackJoinChannelResponse>> {
  return axios.post(
    `${config.slackApiUrl}/conversations.join`,
    { channel },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export async function postMessage({
  accessToken,
  channel,
  ...rest
}: {
  accessToken: string;
  channel: string;
  text: string;
  thread_ts?: string;
}): Promise<AxiosResponse<SlackPostMessageResponse>> {
  return axios.post(
    `${config.slackApiUrl}/chat.postMessage`,
    { channel, ...rest },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export async function postMessageToWebhook({
  webhookUrl,
  ...rest
}: {
  webhookUrl: string;
  text: string;
}) {
  return axios.post(webhookUrl, { ...rest });
}
