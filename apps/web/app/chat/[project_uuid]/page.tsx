"use client";

import { useLayoutEffect, useRef } from "react";

import Header from "./_components/header";
import Input from "./_components/input";
import InputMessage from "./_components/messages/input-message";
import Loading from "./_components/loading";
import OutputMessage from "./_components/messages/output-message";
import { useChat } from "./_hooks/chat";
import { useParams } from "next/navigation";
import { FaqList } from "./_components/messages/FaqList";
import { LoadingDots } from "./_components/LoadingDots";
import { MessageForDisplay } from "./_hooks/useMessages";

export default function Chat() {
  const { project_uuid: projectUuid } = useParams();
  const {
    loading,
    settings,
    messages,
    handleSend,
    handleFaqSelect,
    handleDisableChat,
    isTyping,
  } = useChat(projectUuid as string);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const renderWelcomeMessage = () => {
    if (settings?.welcomeMessage) {
      return <OutputMessage>{settings.welcomeMessage}</OutputMessage>;
    }
  };

  const renderMessage = (message: MessageForDisplay, index: number) => {
    switch (message.sender) {
      case "user":
        return <InputMessage key={index}>{message.text}</InputMessage>;
      case "project":
        return (
          <OutputMessage.System
            key={index}
            realTime={message.realTimeReceived}
            last={index === messages.length - 1}
            followUp={
              settings != null && (
                <FaqList faq={settings?.faq} onSelect={handleFaqSelect} />
              )
            }
          >
            {message.text}
          </OutputMessage.System>
        );
    }
  };

  return (
    <div className="flex h-screen flex-col text-base">
      {loading && <Loading />}
      <Header
        operating_hours={settings?.operating_hours}
        onDisableChat={handleDisableChat}
      />
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="flex flex-col gap-4 px-4 pb-4">
          {renderWelcomeMessage()}
          {messages.map(renderMessage)}
          {isTyping && (
            <OutputMessage>
              <LoadingDots />
            </OutputMessage>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        <Input onSend={handleSend} />
      </div>
    </div>
  );
}
