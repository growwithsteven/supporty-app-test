import * as slackApi from '@/lib/slack-api'

import { NextResponse } from 'next/server'
import { createSupabaseWithServiceRole } from '@/lib/supabase'
import { createToken } from '@/lib/token'

export async function POST(req) {
  const { code } = await req.json()
  const supabase = createSupabaseWithServiceRole()

  // Get access token
  const { data: oauthData } = await slackApi.oauthAccess(code)

  if (oauthData.error) {
    return NextResponse.json({ error: oauthData.error }, { status: 401 })
  }

  // Get project
  let { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', oauthData.team.id)
    .single()

  if (project) {
    // If project exists, update it
    const { data: updatedProject } = await supabase
      .from('projects')
      .update({
        access_token: oauthData.access_token,
        team_name: oauthData.team.name,
        channel_id: oauthData.incoming_webhook.channel_id,
      })
      .eq('team_id', oauthData.team.id)
      .select('*')
      .single()

    project = updatedProject
  } else {
    // If project does not exist, create it
    const { data: newProject } = await supabase
      .from('projects')
      .insert({
        access_token: oauthData.access_token,
        team_id: oauthData.team.id,
        team_name: oauthData.team.name,
        channel_id: oauthData.incoming_webhook.channel_id,
      })
      .select('*')
      .single()

    // Create project details
    await supabase.from('project_details').insert({
      project_uuid: newProject.uuid,
      settings: {
        welcomeMessage: 'Welcome to the chat!',
      },
    })

    project = newProject
  }

  // Join channel
  const { data: joinChannelData } = await slackApi.joinChannel({
    accessToken: project.access_token,
    channel: project.channel_id,
  })

  const welcomeMessage = `Hello, ${project.team_name}!\nMessages from supporty will appear in this channel!`
  if (joinChannelData.error) {
    // Send error message to channel
    await slackApi.postMessageToWebhook({
      webhookUrl: oauthData.incoming_webhook.url,
      text: `${welcomeMessage}\nSupporty can not join private channel. Please invite supporty bot to this channel.`,
    })
  } else {
    // Send welcome message to channel
    await slackApi.postMessageToWebhook({
      webhookUrl: oauthData.incoming_webhook.url,
      text: welcomeMessage,
    })
  }

  // Create token
  const token = await createToken({
    sub: project.uuid,
  })

  return NextResponse.json({
    project: { team: { name: project.team_name }, uuid: project.uuid },
    token,
  })
}
