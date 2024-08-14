import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Controller('inbox')
export class MessengerController {
  constructor(private messengerService: MessengerService) {}

  @Get('messages')
  getMessages(@Query() getMessagesDto: { chatId: number }) {
    return this.messengerService.getMessages(getMessagesDto.chatId);
  }

  @Get('chats')
  getChats() {
    return this.messengerService.getChats();
  }

  @Get('user-chats')
  getUserChats(@Query() getChatsDto: { userId: number }) {
    return this.messengerService.getUserChats(getChatsDto.userId);
  }

  @Post('create-chat')
  createChat(@Body() body: { userId: number; name: string }) {
    return this.messengerService.createChat(body.userId, body.name);
  }

  @Post('create-message')
  sendMessage(
    @Body() body: { userId: number; chatId: number; content: string },
  ) {
    return this.messengerService.sendMessage(
      body.userId,
      body.chatId,
      body.content,
    );
  }

  @Post('delete-chat')
  deleteChat(@Body('chatId') chatId: number) {
    return this.messengerService.deleteChat(chatId);
  }

  @Post('delete-message')
  deleteMessage(@Body('messageId') messageId: number) {
    return this.messengerService.deleteMessage(messageId);
  }

  @Post('update-message')
  updateMessage(@Body() body: { messageId: number; content: string }) {
    return this.messengerService.updateMessage(body.messageId, body.content);
  }

  @Post('update-chat')
  updateChat(@Body() body: { chatId: number; name: string }) {
    return this.messengerService.updateChat(body.chatId, body.name);
  }

  @Post('delete-chat-user')
  deleteChatUser(@Body() body: { userId: number; chatId: number }) {
    return this.messengerService.deleteChatUser(body.userId, body.chatId);
  }

  @Post('add-chat-user')
  addChatUser(@Body() body: { userId: number; chatId: number }) {
    return this.messengerService.addChatUser(body.userId, body.chatId);
  }
}
