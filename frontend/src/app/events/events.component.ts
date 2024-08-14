import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import {TotalCardsComponent} from "../dashboard/total-cards/total-cards.component";
import {AllEventsComponent} from "./all-events/all-events.component";
import {HeaderService} from "../header/header.service";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  imports: [
    TotalCardsComponent,
    AllEventsComponent,
    MatButton,
    RouterLink,
    TranslateModule
  ],
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private headerService: HeaderService,
              private router: Router) {
    this.headerService.setHeaderTitle('events');
  }

  ngOnInit(): void {
  }

  toCreateEvent() {
    this.router.navigate(['/events/create']);
  }
}
