export const MessageSender = {
  project: 'project',
  user: 'user',
} as const
export type MessageSender = (typeof MessageSender)[keyof typeof MessageSender]

export interface Message {
  id: number
  chat_id: number
  project_uuid: string
  sender: MessageSender
  text: string
  created_at: string
}
