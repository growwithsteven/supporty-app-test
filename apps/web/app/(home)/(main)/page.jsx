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
        Welcome to Supporty Beta, No 🐮💩 Customer chat
      </h1>
      <p className="py-4">
        “A customer is asking questions on Intercom/Zendesk, someone respond.🤨”
        <br />
        How many times do you see these messages on your Slack workspace?
      </p>
      <p className="py-4">
        It’s ridiculous that you need separate tools for internal and external
        conversations.
        <br />
        That’s why we built Supporty. So, what makes us different?
        <br />
        We turn your Slack Workspace into a Customer-Support Chat.
        <br />
        With Supporty, you can handle both internal and external conversations
        in the same place—your Slack Workspace.
        <br />
        To use Supporty, you need a Slack Workspace and a channel to get started
        with.
        <br />
        It’s still in beta—completely free, no credit card required.
      </p>
      <p className="py-4">
        Landing Page is work in progress 👷‍♂️
        <br />
        Click the button below to start your no-bullshit customer chat👇
      </p>
      <div className="py-6">
        <AddToSlackButton />
      </div>
    </div>
  )
}
