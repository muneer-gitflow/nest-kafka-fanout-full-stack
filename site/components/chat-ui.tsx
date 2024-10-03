'use client'

import React, { useState } from 'react'
import ChatList from './chat-list'
import ChatWindow from './chat-window'
import { stubChats, stubMessages } from '../lib/stubs/chatData'

export function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatList
        chats={stubChats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <ChatWindow
        selectedChat={selectedChat}
        chats={stubChats}
        messages={stubMessages}
      />
    </div>
  )
}
