import { NextResponse } from 'next/server'
import { createSupabaseWithServiceRole } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { team_id: teamId, event, type, challenge } = await req.json()
  const supabase = createSupabaseWithServiceRole()

  if (type === 'url_verification') {
    return NextResponse.json({ challenge })
  }

  // Verify if it's a reply in a thread from a user
  if (
    event.type !== 'message' ||
    event.subtype ||
    event.bot_id ||
    !event.thread_ts
  ) {
    return NextResponse.json(
      { error: 'Not a thread reply from a user' },
      { status: 400 },
    )
  }

  // Get project by channel
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', teamId)
    .eq('channel_id', event.channel)
    .maybeSingle()

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  // Get chat by thread_ts and project
  const { data: chat } = await supabase
    .from('chats')
    .select('*')
    .eq('project_uuid', project.uuid)
    .eq('thread_ts', event.thread_ts)
    .is('disabled_at', null)
    .maybeSingle()

  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
  }

  // Create message
  await supabase.from('messages').insert({
    chat_id: chat.id,
    project_uuid: chat.project_uuid,
    sender: 'project',
    text: event.text,
  })

  return NextResponse.json(null)
}
