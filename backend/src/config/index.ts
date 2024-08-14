import { TotalCard } from '../entities/total-cards';
import { User } from '../entities/user';
import { ActiveEvent } from '../entities/active-event';
import { Event } from '../entities/event';
import { Image } from '../entities/image';
import { Chat } from '../entities/chat';
import { Message } from '../entities/message';
import { ChatUser } from '../entities/chatUser';

export * from './database';
export * from './app';
export * from './jwt';
const entities = [
  User,
  TotalCard,
  ActiveEvent,
  Event,
  Image,
  Chat,
  Message,
  ChatUser,
];

export { User, TotalCard, Event, Image, Chat, Message, ChatUser };

export default entities;
