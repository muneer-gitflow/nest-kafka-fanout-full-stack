import { Chat, Message } from "../../types/chat";

export const stubChats: Chat[] = [
  {
    id: 1,
    name: "Alice Smith",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Bob Johnson",
    lastMessage: "Can we meet tomorrow?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Carol Williams",
    lastMessage: "Thanks for your help!",
    time: "Tuesday",
    unread: 1,
    online: true,
  },
];

export const stubMessages: Message[] = [
  {
    id: 1,
    sender: "Alice Smith",
    content: "Hey, how are you?",
    time: "10:30 AM",
    type: "text",
    status: "read",
  },
  {
    id: 2,
    sender: "You",
    content: "I'm good, thanks! How about you?",
    time: "10:31 AM",
    type: "text",
    status: "sent",
  },
  {
    id: 3,
    sender: "Alice Smith",
    content: "I'm doing great! Just wanted to catch up.",
    time: "10:32 AM",
    type: "text",
    status: "read",
  },
  {
    id: 4,
    sender: "Alice Smith",
    content: "https://example.com/cool-article",
    time: "10:33 AM",
    type: "link",
    status: "read",
  },
  {
    id: 5,
    sender: "You",
    content: "/placeholder.svg?height=200&width=300",
    time: "10:34 AM",
    type: "image",
    status: "delivered",
  },
  {
    id: 6,
    sender: "Alice Smith",
    content: "https://example.com/video.mp4",
    time: "10:35 AM",
    type: "video",
    status: "read",
  },
  {
    id: 7,
    sender: "You",
    content: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    time: "10:36 AM",
    type: "multiple_images",
    status: "sent",
  },
  {
    id: 8,
    sender: "Alice Smith",
    content: "This message was forwarded",
    time: "10:37 AM",
    type: "forwarded",
    status: "read",
  },
  {
    id: 9,
    sender: "You",
    content: "This message was deleted",
    time: "10:38 AM",
    type: "deleted",
    status: "deleted",
  },
];