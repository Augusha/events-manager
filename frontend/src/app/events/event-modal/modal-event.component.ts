import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {Router} from '@angular/router';
import {EventService} from "../event.service";

@Component({
  selector: 'app-modal-event',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './modal-event.component.html',
  styleUrl: './modal-event.component.css'
})
export class ModalEventComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private eventService: EventService) {}

  editEvent() {
    this.router.navigate([`/events/edit/${this.data.id}`]);
  }

  getRow(items: string) {
    return this.eventService.getRow(items);
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.data.id);
  }
}
