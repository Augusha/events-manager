import {Component, HostListener} from '@angular/core';
import { MessengerChatsComponent } from './messenger-users/messenger-chats.component';
import { MessengerBoxComponent } from './messenger-box/messenger-box.component';
import { Chat, MessengerService } from './messenger.service';
import { HeaderService } from '../header/header.service';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [MessengerChatsComponent, MessengerBoxComponent, MatIcon, MatIconButton, NgIf],
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  providers: [MessengerService]
})
export class MessengerComponent {
  selectedUser: Chat | null = null;
  isChatListHidden = false;
  isSmallScreen = window.innerWidth < 800;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth < 1000;
  }

  constructor(public messengerService: MessengerService, private headerService: HeaderService) {
    this.headerService.setHeaderTitle('inbox');
  }

  onUserSelected(user: Chat) {
    this.selectedUser = user;
  }

  toggleChatList() {
    this.isChatListHidden = !this.isChatListHidden;
  }
}
