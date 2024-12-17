"use client";

import { useLayoutEffect, useRef } from "react";

import Header from "./_components/header";
import Input from "./_components/input";
import InputMessage from "./_components/messages/input-message";
import Loading from "./_components/loading";
import OutputMessage from "./_components/messages/output-message";
import { useChat } from "./_hooks/chat";
import { useParams } from "next/navigation";
import { FaqList } from "./_components/messages/system/FaqList";
import { LoadingDots } from "./_components/LoadingDots";
import { StoredMessage } from "./_hooks/useMessages";
import { useUserAuth } from "./_hooks/user-auth";
import { ContactReq } from "./_components/messages/system/ContactReq";
import { MessageSender, MessageType } from "@/types/message";

export default function Chat() {
  useUserAuth.Init();

  const { project_uuid: projectUuid } = useParams();
  const {
    loading,
    settings,
    messages,
    handleSend,
    handleFaqSelect,
    handleContactReqSubmit,
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

  const renderMessage = (message: StoredMessage, index: number) => {
    if (message.sender === MessageSender.user) {
      return (
        <InputMessage
          key={message.created_at}
          sendAt={new Date(message.created_at)}
        >
          {message.text}
        </InputMessage>
      );
    }

    if (message.type === MessageType.contact_req) {
      return (
        <ContactReq
          key={message.created_at}
          {...message}
          onSubmit={handleContactReqSubmit}
        />
      );
    }

    const showFollowUp =
      messages.findLastIndex(
        (x) =>
          x.type !== MessageType.contact_req &&
          x.sender === MessageSender.project,
      ) === index;

    return (
      <OutputMessage.System
        key={message.created_at}
        sendAt={new Date(message.created_at)}
        realTime={message.realTimeReceived}
        showFollowUp={showFollowUp}
        followUp={
          settings?.faq != null && (
            <FaqList faq={settings.faq} onSelect={handleFaqSelect} />
          )
        }
      >
        {message.text}
      </OutputMessage.System>
    );
  };

  return (
    <div className="flex h-screen flex-col text-base">
      {loading && <Loading />}
      <Header
        opening_hours={settings?.opening_hours}
        onDisableChat={handleDisableChat}
      />
      <div className="flex-1 overflow-y-auto pb-4" ref={scrollRef}>
        <div className="flex flex-col gap-4 p-4">
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
