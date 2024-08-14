import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { MatList, MatListItem } from "@angular/material/list";
import { MessengerService, Chat } from '../messenger.service';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-messenger-users',
  standalone: true,
  templateUrl: './messenger-chats.component.html',
  imports: [NgForOf, MatListItem, MatList, MatIcon, MatIconButton, NgIf],
  styleUrls: ['./messenger-chats.component.css']
})
export class MessengerChatsComponent implements OnInit {
  @Output() userSelected = new EventEmitter<Chat>();
  chats: Chat[] = [];

  constructor(private messengerService: MessengerService) {}

  ngOnInit() {
    this.messengerService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }

  selectUser(user: Chat) {
    this.userSelected.emit(user);
  }
}
