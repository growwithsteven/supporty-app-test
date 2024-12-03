'use client'

import AddToSlackButton from './_components/add-to-slack-button'
import { useEffect } from 'react'
import { useProjectAuth } from '@/hooks/project-auth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { authState } = useProjectAuth()
  const router = useRouter()

  useEffect(() => {
    if (authState) {
      router.push('/dashboard')
    }
  }, [authState])

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <h1 className="pb-10 text-4xl font-bold">
        Welcome to Supporty Beta 🚀
        <br />No 🐮💩 Customer Chat
      </h1>
      <p className="py-4">
        “How many times have you seen this in your Slack workspace?”
        <br />
        <em>“A customer is asking questions on Intercom/Zendesk, someone respond.🤨”</em>
      </p>
      <p className="py-4">
        It’s frustrating, right? Having to juggle separate tools for internal and external conversations is outdated and inefficient.
      </p>
      <p className="py-4">
        That’s why we built <strong>Supporty</strong>—to simplify your workflow by turning your Slack Workspace into a <strong>Customer Support Chat</strong>.
        <br />
        With Supporty, you can manage both internal and external conversations seamlessly, all in one place: <strong>Slack</strong>.
      </p>
      <p className="py-4 font-bold">Why Supporty?</p>
      <ul className="list-disc text-left px-10">
        <li>No more switching tools.</li>
        <li>No more missed messages.</li>
        <li>Everything, streamlined in Slack.</li>
      </ul>
      <p className="py-4 font-bold">Getting Started</p>
      <p className="py-4">
        All you need is:
        <br />
        1️⃣ A Slack Workspace.
        <br />
        2️⃣ A dedicated channel for customer chat.
      </p>
      <p className="py-4">
        <strong>It’s beta time! 🎉</strong>
        <br />
        Completely free, no credit card required.
      </p>
      <p className="py-4">
        Your no-bullshit customer chat experience is just a click away. 👇
      </p>
      <div className="py-6">
        <AddToSlackButton />
      </div>
    </div>
  )
}