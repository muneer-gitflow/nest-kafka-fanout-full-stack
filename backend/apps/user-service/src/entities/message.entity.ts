import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column()
  content: string;

  @Column({ type: 'datetime' })
  time: Date;

  @Column()
  type: string;

  @Column()
  status: string;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;
}