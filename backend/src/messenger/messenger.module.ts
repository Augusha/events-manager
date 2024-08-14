import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Message } from '../entities/message';
import { Chat } from '../entities/chat';
import { ChatUser } from '../entities/chatUser';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, ChatUser, User])],
  providers: [MessengerService],
  exports: [MessengerService],
  controllers: [MessengerController],
})
export class MessengerModule {}
