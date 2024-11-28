import axios from 'axios'
import { createSupabaseUser } from '@/lib/supabase'

const client = axios.create({
  baseURL: '/api',
})

client.interceptors.request.use(async (config) => {
  const supabase = createSupabaseUser()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    config.headers['Authorization'] = `Bearer ${session.access_token}`
  }

  return config
})

export async function sendMessage(projectUuid, text) {
  return client.post('/messages', {
    projectUuid,
    text,
  })
}

export async function disableChat(projectUuid) {
  return client.post('/chats/disable', { projectUuid })
}
