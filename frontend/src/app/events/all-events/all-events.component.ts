import {Component, OnInit} from '@angular/core';
import {FormatValuePipe} from "../../pipes/format-value.pipe";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {EventService} from "../event.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalEventComponent} from "../event-modal/modal-event.component";
import {Event} from "../event.model";

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [
    FormatValuePipe,
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatIcon,
    NgForOf,
    TranslateModule,
    NgClass,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css', '../../dashboard/total-cards/total-cards.component.css']
})
export class AllEventsComponent implements OnInit {

  breakpoint: number = 0;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog) {
  }

  getRow(items: string) {
    return this.eventService.getRow(items);
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 750) ? 1 : (window.innerWidth <= 1200) ? 2 : 4;
    this.fetchEvents();
  }

  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 750) ? 1 : (window.innerWidth <= 1200) ? 2 : 4;
  }

  openEventDetails(event: any) {
    const dialogRef = this.dialog.open(ModalEventComponent, {
      maxWidth: '500px',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchEvents();
    });
  }

  dataSource = {
    data: <Event[]>[]
  };

  fetchEvents() {
    this.eventService.getEvents()
      .subscribe({
        next: (response: any) => {
          this.dataSource.data = response.items;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
