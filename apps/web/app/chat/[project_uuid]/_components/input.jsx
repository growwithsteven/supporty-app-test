'use client'

import TextareaAutosize from 'react-textarea-autosize'
import { useState } from 'react'

export default function Input({ onSend }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (text.trim().length > 0) {
      onSend?.(text)
      setText('')
    }
  }

  return (
    <div className="bg-base-200 text-base-content flex w-full rounded-2xl p-3">
      <TextareaAutosize
        className="w-full resize-none bg-transparent outline-none"
        maxRows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault()
            handleSend(text)
          }
        }}
      />
    </div>
  )
}
