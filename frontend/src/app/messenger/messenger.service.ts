import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments';
import { UsersDataService } from '../users/users-data.service';

export interface Chat {
  id: number;
  name?: string;
}

export interface Message {
  id: number;
  chatId: number;
  content: string;
  senderId: number;
  createdAt: string;
  senderFirstname?: string;
  senderLastname?: string;
  senderAvatarId: number;
  senderAvatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessengerService {

  constructor(private http: HttpClient) {}

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.apiUrl}/inbox/user-chats?userId=${this.getUserIdFromToken()}`);
  }

  getMessages(chatId: number): Observable<Message[]> {
    console.log('chatId: ', chatId);
    return this.http.get<Message[]>(`${environment.apiUrl}/inbox/messages?chatId=${chatId}`).pipe(
      map(messages => {
        return messages;
      })
    );
  }

  createChat(userId: number, name: string): Observable<Chat> {
    return this.http.post<Chat>(`${environment.apiUrl}/inbox/create-chat`, { userId, name });
  }

  sendMessage(chatId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}/inbox/create-message`, { userId: this.getUserIdFromToken(), chatId, content });
  }

  deleteChat(chatId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/inbox/delete-chat`, { chatId });
  }

  deleteMessage(messageId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/inbox/delete-message`, { messageId });
  }

  updateMessage(messageId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}/inbox/update-message`, { messageId, content });
  }

  updateChat(chatId: number, name: string): Observable<Chat> {
    return this.http.post<Chat>(`${environment.apiUrl}/inbox/update-chat`, { chatId, name });
  }

  deleteChatUser(userId: number, chatId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/inbox/delete-chat-user`, { userId, chatId });
  }

  addChatUser(userId: number, chatId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/inbox/add-chat-user`, { userId, chatId });
  }

  get userId(): number {
    return this.getUserIdFromToken();
  }

  private getUserIdFromToken(): number {
    const token = localStorage.getItem('access_token');
    if (!token) return 0;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch (error) {
      console.error('Error parsing token payload', error);
      return 0;
    }
  }
}
