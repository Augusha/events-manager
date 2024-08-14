import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message as MessageEntity } from '../entities/message';
import { Chat as ChatEntity } from '../entities/chat';
import { ChatUser } from '../entities/chatUser';
import { User } from '../entities/user';

export interface Message {
  id: number;
  name: string;
  chatId: number;
  content: string;
  senderId: number;
  createdAt: Date;
}

export interface Chat {
  id: number;
  name: string;
}

@Injectable()
export class MessengerService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    @InjectRepository(ChatUser)
    private readonly chatUserRepository: Repository<ChatUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMessages(chatId: number): Promise<Message[]> {
    const messages: any[] = await this.messageRepository.find({
      where: { chatId: chatId },
    });

    for (const message of messages) {
      const user = await this.userRepository.findOne({
        where: { id: message.senderId },
      });
      message.senderFirstname = `${user.firstname}`;
      message.senderLastname = `${user.lastname}`;
      message.senderAvatarId = user.profileImageId;
    }

    return messages;
  }

  async getChats(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  async getUserChats(userId: number): Promise<any[]> {
    const chatUsers = await this.chatUserRepository.find({
      where: { userId: userId },
    });

    if (chatUsers.length === 0) {
      throw new Error(`Invalid userId`);
    }

    const chatIds = chatUsers.map((chatUser) => chatUser.chatId);
    return await this.chatRepository.findByIds(chatIds);
  }

  async createChat(userId: number, name: string): Promise<Chat> {
    const chat = await this.chatRepository.save({ name });
    await this.chatUserRepository.save({
      userId: userId,
      chatId: chat.id,
    });
    return chat;
  }

  async sendMessage(
    userId: number,
    chatId: number,
    content: string,
  ): Promise<Message> {
    const chatUser = await this.chatUserRepository.findOne({
      where: { userId: userId, chatId: chatId },
    });

    if (!chatUser) {
      throw new Error('User is not a member of the chat');
    }

    return await this.messageRepository.save({
      name: 'message',
      chatId,
      content,
      senderId: userId,
      createdAt: new Date(),
    });
  }

  async deleteChat(chatId: number): Promise<void> {
    await this.chatRepository.delete({ id: chatId });
    await this.messageRepository.delete({ chatId });
    await this.chatUserRepository.delete({ chatId });
  }

  async updateChat(chatId: number, name: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
    });
    chat.name = name;
    return this.chatRepository.save(chat);
  }

  async deleteMessage(messageId: number): Promise<void> {
    await this.messageRepository.delete({ id: messageId });
  }

  async updateMessage(messageId: number, content: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });
    message.content = content;
    return this.messageRepository.save(message);
  }

  async deleteChatUser(userId: number, chatId: number): Promise<void> {
    if (userId && chatId) {
      await this.chatUserRepository
        .createQueryBuilder()
        .delete()
        .from(ChatUser)
        .where('userId = :userId', { userId })
        .andWhere('chatId = :chatId', { chatId })
        .execute();
    } else {
      throw new Error(`Invalid userId or chatId`);
    }
  }

  async addChatUser(userId: number, chatId: number): Promise<void> {
    await this.chatUserRepository.save({
      userId: userId,
      chatId: chatId,
    });
  }
}
