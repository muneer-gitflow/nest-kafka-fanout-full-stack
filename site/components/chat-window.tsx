import React from 'react'
import { ScrollArea } from '@components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Input } from '@components/ui/input'
import { MoreVertical, Camera, Paperclip, Mic, Send } from 'lucide-react'
import { Chat, Message } from '../types/chat'
import MessageBubble from './MessageBubble'

interface ChatWindowProps {
  selectedChat: string | null
  chats: Chat[]
  messages: Message[]
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  chats,
  messages,
}) => {
  if (!selectedChat) {
    return (
      <div className="hidden md:flex flex-col w-2/3 bg-gray-900">
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      </div>
    )
  }

  const currentChat = chats.find((chat) => chat.id === Number(selectedChat))

  return (
    <div className="hidden md:flex flex-col w-2/3 bg-gray-900">
      <div className="p-4 bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={`/placeholder-avatar-${selectedChat}.jpg`}
              alt={currentChat?.name}
            />
            <AvatarFallback>{currentChat?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{currentChat?.name}</h2>
            <p className="text-xs text-gray-400">
              {currentChat?.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <MoreVertical className="w-5 h-5 text-gray-400" />
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ScrollArea>
      <div className="p-4 bg-gray-800 flex items-center space-x-2">
        <Camera className="w-6 h-6 text-gray-400" />
        <Paperclip className="w-6 h-6 text-gray-400" />
        <Input
          className="flex-1 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
          placeholder="Type a message"
        />
        <Mic className="w-6 h-6 text-gray-400" />
        <Send className="w-6 h-6 text-green-500" />
      </div>
    </div>
  )
}

export default ChatWindow
