import React, { useMemo } from 'react'
import { ScrollArea } from '@components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Search, MoreVertical } from 'lucide-react'
import truncate from 'lodash/truncate'

interface Chat {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  user: {
    id: string
    name: string
  }
}

interface ChatListProps {
  chats: Chat[]
  selectedChat: string | null
  setSelectedChat: (chatId: string) => void
  userStatuses: Record<string, boolean>
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  setSelectedChat,
  userStatuses,
}) => {
  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      // First, sort by online status
      if (userStatuses[a.user.id] && !userStatuses[b.user.id]) return -1;
      if (!userStatuses[a.user.id] && userStatuses[b.user.id]) return 1;
      
      // If both have the same online status, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [chats, userStatuses]);

  return (
    <div className="w-full md:w-1/3 border-r border-gray-800">
      <div className="p-4 bg-gray-800 flex justify-between items-center">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="Your Avatar" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex space-x-2">
          <Search className="w-5 h-5 text-gray-400" />
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        {sortedChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 flex items-center space-x-4 hover:bg-gray-800 cursor-pointer ${
              selectedChat === chat.id ? 'bg-gray-800' : ''
            }`}
            onClick={() => setSelectedChat(chat.id)}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage
                  src={`/placeholder-avatar-${chat.id}.jpg`}
                  alt={chat.name}
                />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  userStatuses[chat.user.id] ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">
                {truncate(chat.lastMessage, { length: 50 })}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {chat.unread}
              </div>
            )}
            {/* Remove the online status indicator as it's not provided in the current data */}
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default ChatList
