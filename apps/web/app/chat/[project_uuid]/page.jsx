'use client'

import { useLayoutEffect, useRef } from 'react'

import Header from './_components/header'
import Input from './_components/input'
import InputMessage from './_components/messages/input-message'
import Loading from './_components/loading'
import OutputMessage from './_components/messages/output-message'
import { useChat } from './_hooks/chat'
import { useParams } from 'next/navigation'

export default function Chat() {
  const { project_uuid: projectUuid } = useParams()
  const { loading, settings, messages, handleSend, handleDisableChat } =
    useChat(projectUuid)
  const scrollRef = useRef(null)

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const renderWelcomeMessage = () => {
    if (settings?.welcomeMessage) {
      return <OutputMessage>{settings.welcomeMessage}</OutputMessage>
    }
  }

  const renderMessage = (message, index) => {
    switch (message.sender) {
      case 'user':
        return <InputMessage key={index}>{message.text}</InputMessage>
      case 'project':
        return <OutputMessage key={index}>{message.text}</OutputMessage>
    }
  }

  return (
    <div className="flex h-screen flex-col text-base">
      {loading && <Loading />}
      <Header
        operating_hours={settings?.operating_hours}
        onDisableChat={handleDisableChat}
      />
      <div
        className="flex-1 overflow-y-auto"
        ref={scrollRef}
      >
        <div className="flex flex-col gap-2 px-4 pb-4">
          {renderWelcomeMessage()}
          {messages.map(renderMessage)}
        </div>
      </div>
      <div className="px-4 pb-4">
        <Input onSend={handleSend} />
      </div>
    </div>
  )
}
