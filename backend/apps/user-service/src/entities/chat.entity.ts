import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastMessage: string;

  @Column({ type: 'datetime' })
  time: Date;

  @Column({ default: 0 })
  unread: number;

  @ManyToOne(() => User, user => user.chats)
  user: User;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];
}