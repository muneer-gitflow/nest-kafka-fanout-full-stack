export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: number;
  sender: string;
  content: string | string[];
  time: string;
  type: 'text' | 'link' | 'image' | 'video' | 'multiple_images' | 'forwarded' | 'deleted';
  status: 'sent' | 'delivered' | 'read' | 'deleted';
}

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'deleted';