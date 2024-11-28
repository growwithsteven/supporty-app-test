import * as api from '@/lib/user-api'

import { createSupabaseUser } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useState } from 'react'
import { useUserAuth } from './user-auth'

export function useChat(projectUuid) {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState(null)
  const [messages, setMessages] = useState([])
  const { user } = useUserAuth()

  const fetchMessages = async () => {
    const supabase = createSupabaseUser()

    const { data: chat } = await supabase
      .from('chats')
      .select('*')
      .eq('project_uuid', projectUuid)
      .eq('user_id', user.id)
      .maybeSingle()

    if (chat) {
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chat.id)
        .order('id', { ascending: true })

      setMessages(messages)
    }

    setLoading(false)
  }

  const fetchSettings = async () => {
    const supabase = createSupabaseUser()
    const { data: projectDetail } = await supabase
      .from('project_details')
      .select('*')
      .eq('project_uuid', projectUuid)
      .single()

    setSettings(projectDetail.settings)
  }

  useEffect(() => {
    if (!user) {
      return
    }

    const supabase = createSupabaseUser()

    supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: 'sender=eq.project',
        },
        (payload) => {
          const message = payload.new
          if (message.project_uuid === projectUuid) {
            setMessages((prev) => [...prev, message])
          }
        },
      )
      .subscribe()

    fetchMessages()
    fetchSettings()

    return () => {
      supabase.removeAllChannels()
    }
  }, [user])

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }])

    api.sendMessage(projectUuid, text).catch(() => {
      toast.error('Failed to send message')
    })
  }

  const handleDisableChat = () => {
    toast.success('New Conversation Started')
    setMessages([])

    api.disableChat(projectUuid).catch(() => {})
  }

  return {
    loading,
    settings,
    messages,
    handleSend,
    handleDisableChat,
  }
}
