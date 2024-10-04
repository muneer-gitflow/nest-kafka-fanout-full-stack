export class Chat {
  id: number;
  name: string;
  lastMessage: string | null;
  time: Date;
  unread: number;
  userId: number;
  messages: any[]; // We'll define this properly when needed
}