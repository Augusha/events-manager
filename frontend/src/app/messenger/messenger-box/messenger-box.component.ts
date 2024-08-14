import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {Chat, Message, MessengerService} from '../messenger.service';
import {FormsModule} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {UsersDataService} from "../../users/users-data.service";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-messenger-box',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {subscriptSizing: 'dynamic'}},
    DatePipe
  ],
  standalone: true,
  templateUrl: './messenger-box.component.html',
  imports: [NgIf, NgForOf, FormsModule, MatFormField, MatInput, MatButton, NgStyle, NgClass, NgOptimizedImage, MatIcon, MatIconButton],
  styleUrls: ['./messenger-box.component.css']
})
export class MessengerBoxComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() selectedChat: Chat | null = null;
  messages: Message[] = [];
  avatarCache: { [key: number]: string } = {};
  loadedUsers: Set<number> = new Set();
  newMessage: string = '';
  currentUserId: number = 0;
  editingMessageId: number | null = null;
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  constructor(
    public messengerService: MessengerService,
    private datePipe: DatePipe,
    private usersDataService: UsersDataService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.currentUserId = this.messengerService.userId;
    this.loadMessages();
  }

  ngOnChanges() {
    if (this.selectedChat) {
      sessionStorage.setItem('selectedChatId', this.selectedChat.id.toString());
      this.messages = [];
      this.loadedUsers.clear();
      this.avatarCache = {};
      this.loadMessages();
      this.cancelEditing();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadMessages() {
    if (this.selectedChat) {
      this.messengerService.getMessages(this.selectedChat.id).subscribe((newMessages) => {
        if (newMessages.length > 0) {
          this.messages = newMessages;
          this.getMessageAvatars();
        }
      });
    }
  }

  formatDateForSeparator(date: string): string {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return this.datePipe.transform(date, 'MMMM d, yyyy') || '';
    }
  }

  isDifferentDay(index: number): boolean {
    if (index === 0) {
      return true;
    }
    const currentMessageDate = new Date(this.messages[index].createdAt).toDateString();
    const previousMessageDate = new Date(this.messages[index - 1].createdAt).toDateString();
    return currentMessageDate !== previousMessageDate;
  }

  getMessageAvatars() {
    const uniqueUsers = new Set<number>();
    this.messages.forEach(message => {
      if (message.senderAvatarId && message.senderAvatarId !== 0 && message.senderId !== this.currentUserId) {
        uniqueUsers.add(message.senderAvatarId);
      }
    });

    uniqueUsers.forEach(userId => {
      if (!this.loadedUsers.has(userId)) {
        if (this.avatarCache[userId]) {
          this.messages.forEach(message => {
            if (message.senderAvatarId === userId) {
              message.senderAvatar = this.avatarCache[userId];
            }
          });
        } else {
          console.log('Fetching avatar for user ' + userId);
          this.usersDataService.getImageById(userId).subscribe(
            (imageData: string) => {
              const avatar = JSON.parse(imageData).image || null;
              this.avatarCache[userId] = avatar;
              this.messages.forEach(message => {
                if (message.senderAvatarId === userId) {
                  message.senderAvatar = avatar;
                }
              });
              this.loadedUsers.add(userId);
            }
          );
        }
      }
    });
  }

  deleteMessage(messageId: number) {
    this.messengerService.deleteMessage(messageId).subscribe(() => {
      this.messages = this.messages.filter(message => message.id !== messageId);
      this.snackBar.open('Message deleted', 'Close', { duration: 3000 });
    });
  }

  editMessage(messageId: number, newContent: string) {
    this.messengerService.updateMessage(messageId, newContent).subscribe((updatedMessage) => {
      const index = this.messages.findIndex(message => message.id === messageId);
      if (index !== -1) {
        this.messages[index] = updatedMessage;
      }
      this.editingMessageId = null;
      this.snackBar.open('Message updated', 'Close', { duration: 3000 });
    });
  }

  startEditing(messageId: number, currentContent: string) {
    this.editingMessageId = messageId;
    this.newMessage = currentContent;
  }

  cancelEditing() {
    this.editingMessageId = null;
    this.newMessage = '';
  }

  sendMessage() {
    if (this.selectedChat && this.newMessage.trim()) {
      if (this.editingMessageId) {
        this.editMessage(this.editingMessageId, this.newMessage);
      } else {
        this.messengerService.sendMessage(this.selectedChat.id, this.newMessage).subscribe((message) => {
          this.messages.push(message);
          this.newMessage = '';
          this.scrollToBottom();
        });
      }
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  isMessageFromCurrentUser(senderId: number): boolean {
    return senderId === this.currentUserId;
  }

  isSameAuthorAsNext(index: number): boolean {
    if (index === this.messages.length - 1) {
      return false;
    }
    return this.messages[index].senderId === this.messages[index + 1].senderId;
  }

  isSameAuthorAsPrevious(index: number): boolean {
    if (index === 0) {
      return false;
    }
    return this.messages[index].senderId === this.messages[index - 1].senderId;
  }

  isMoreThanOneHourDifference(index: number): boolean {
    if (index === 0) {
      return false;
    }
    const currentMessageDate = new Date(this.messages[index].createdAt);
    const previousMessageDate = new Date(this.messages[index - 1].createdAt);
    const timeDifference = currentMessageDate.getTime() - previousMessageDate.getTime();
    return timeDifference > 3600000; // 1 hour in milliseconds
  }

  isMoreThanOneHourDifferenceNext(index: number): boolean {
    if (index === this.messages.length - 1) {
      return false;
    }
    const currentMessageDate = new Date(this.messages[index].createdAt);
    const nextMessageDate = new Date(this.messages[index + 1].createdAt);
    const timeDifference = nextMessageDate.getTime() - currentMessageDate.getTime();
    return timeDifference > 3600000; // 1 hour in milliseconds
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    }
  }
}
