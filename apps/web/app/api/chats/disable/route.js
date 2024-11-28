import { NextResponse } from 'next/server'
import { createSupabaseWithServiceRole } from '@/lib/supabase'
import { verifyTokenFromAuthorization } from '@/lib/token'

export async function POST(req) {
  const { projectUuid } = await req.json()
  const supabase = createSupabaseWithServiceRole()
  const { sub: userId } = await verifyTokenFromAuthorization(
    req.headers.get('Authorization'),
  )

  // Get chat
  let { data: chat } = await supabase
    .from('chats')
    .update({ disabled_at: new Date() })
    .eq('project_uuid', projectUuid)
    .eq('user_id', userId)
    .is('disabled_at', null)
    .select('*')
    .maybeSingle()

  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
  }

  return NextResponse.json(chat)
}
