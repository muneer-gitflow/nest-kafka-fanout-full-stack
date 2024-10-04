'use client'

import React, { useState, useCallback } from 'react'
import ChatList from './chat-list'
import ChatWindow from './chat-window'
import { stubMessages } from '../lib/stubs/chatData'
import { useQuery } from '@apollo/client'
import { GET_CHATS } from '@/app/graphql/queries'
import { Chat } from '@/types/chat'
import { UserStatusSubscription } from './UserStatusSubscription'

export function ChatScreen() {
  const { loading, error, data } = useQuery(GET_CHATS)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [userStatuses, setUserStatuses] = useState<Record<string, boolean>>({})

  const handleStatusUpdate = useCallback((userId: string, online: boolean) => {
    setUserStatuses(prev => ({ ...prev, [userId]: online }))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const chats =
    data?.chats?.edges.map((edge: { node: Chat }) => edge.node) || []

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <UserStatusSubscription onStatusUpdate={handleStatusUpdate} />
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        userStatuses={userStatuses}
      />
      <ChatWindow
        selectedChat={selectedChat}
        chats={chats}
        messages={stubMessages}
      />
    </div>
  )
}
