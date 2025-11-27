export const config = {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    slackApiUrl: process.env.SLACK_API_URL || "https://slack.com/api",
} as const;
