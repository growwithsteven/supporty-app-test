import * as api from '@/lib/user-api'

import { createSupabaseUser } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useState } from 'react'
import { useUserAuth } from './user-auth'
import { Faq, Project, ProjectSettings } from '@/types/project'
import { Message } from '@/types/message'
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js'

export function useChat(projectUuid: Project['uuid']) {
  const [loading, setLoading] = useState(true)

  const [isTyping, setIsTyping] = useState(false)

  const [settings, setSettings] = useState<ProjectSettings | null>(null)
  const [messages, setMessages] = useState<Pick<Message, 'sender' | 'text'>[]>(
    [],
  )
  const { user } = useUserAuth()

  const fetchMessages = async () => {
    if (!user) {
      return
    }

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

      setMessages(messages || [])
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
        (payload: RealtimePostgresInsertPayload<Message>) => {
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

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === 'project'
    ) {
      setIsTyping(false)
    }
  }, [messages])

  const handleSend = (text: string, internalText?: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text, internalText }])

    api.sendMessage({ projectUuid, text, internalText }).catch(() => {
      toast.error('Failed to send message')
    })
  }

  const handleSendBySystem = (text: string) => {
    api.saveSystemMessage({ projectUuid, text }).catch(() => {
      console.error('Failed to save system message')
    })
  }

  const handleFaqSelect = (faq: Faq) => {
    handleSend(faq.question, `[FAQ clicked] - ${faq.question}`)

    setIsTyping(true)
    setTimeout(() => {
      handleSendBySystem(faq.answer)
    }, 2000)
  }

  const handleDisableChat = () => {
    toast.success('New Conversation Started')
    setMessages([])

    api.disableChat({ projectUuid }).catch(() => {})
  }

  return {
    loading,
    settings,
    messages,
    handleSend,
    handleFaqSelect,
    handleDisableChat,
    isTyping,
  }
}
