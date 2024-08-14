import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.css'
})
export class DeleteUserModalComponent {

  constructor( private dialogRef: MatDialogRef<DeleteUserModalComponent>) {}

  onDelete() {
    this.dialogRef.close(true);
  }
}
