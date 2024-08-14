import {Component, ViewChild, ElementRef, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatInput } from "@angular/material/input";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
import {MatListItemIcon, MatListItemTitle} from "@angular/material/list";
import {DeleteUserModalComponent} from "../delete-user-modal/delete-user-modal.component";
import {UsersDataService} from "../../users-data.service";
import {NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatCheckbox,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    MatIcon,
    NgIf,
    ReactiveFormsModule,
    MatListItemIcon,
    MatListItemTitle,
    MatError
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  editUserForm = new FormGroup({
    id: new FormControl(''),
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    profileImageId: new FormControl(0),
    profileImage: new FormControl('')
  });

  onSubmit() {
    if (this.editUserForm.valid) {
      const userData = this.editUserForm.value;

      if (userData && userData.id) {
        this.usersDataService.updateUser({
          userId: userData.id,
          email: userData.email,
          password: userData.password,
          firstname: userData.firstname,
          lastname: userData.lastname,
          position: userData.position,
          role: userData.role,
          profileImageId: userData.profileImageId,
          image: userData.profileImage,
        });
        this.dialogRef.close();
      } else {
        this.authService.snackbarMessage("Form data is incomplete or missing.");
      }
    } else {
      this.authService.snackbarMessage("Invalid form data");
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditUserModalComponent>,
    private dialog: MatDialog,
    private usersDataService: UsersDataService,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit() {
    this.editUserForm.patchValue(this.data);
    const profileImageId = this.data.profileImageId;
    console.log('Profile image ID:', profileImageId);
    if (profileImageId && profileImageId !== 0) {
      this.usersDataService.getImageById(profileImageId).subscribe(
        (imageData: string) => {
          const image = JSON.parse(imageData).image;
          this.editUserForm.patchValue({ profileImage: image });
        },
        (error) => {
          this.authService.snackbarMessage("Failed to fetch image");
        }
      );
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = reader.result as string;
          this.imageCompress.compressFile(image, -1, 50, 50).then(
            result => {
              this.editUserForm.patchValue({ profileImage: result });
            }
          );
        };
        reader.readAsDataURL(file);
      } else {
        alert('Only PNG and JPG images are allowed.');
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.usersDataService.deleteUser(this.editUserForm.value.id);
        this.dialogRef.close();
      }
    });
  }
}
