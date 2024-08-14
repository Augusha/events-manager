import {Component, ViewChild, ElementRef} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";
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
    NgOptimizedImage,
    MatError
  ],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  addUserForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    profileImageId: new FormControl(0),
    profileImage: new FormControl('')
  });

  onSubmit() {
    if (this.addUserForm.valid) {
      if (this.addUserForm.value.password === this.addUserForm.value.confirmPassword) {
        this.addUser();
        this.dialogRef.close();
      } else {
        this.authService.snackbarMessage('Passwords do not match!');
      }
    } else {
      this.authService.snackbarMessage('Make sure all fields are filled out correctly.');
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService,
              private usersDataService: UsersDataService,
              private dialogRef: MatDialogRef<AddUserModalComponent>,
              private imageCompress: NgxImageCompressService) {
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
              this.addUserForm.patchValue({ profileImage: result });
              this.addUserForm.patchValue({ profileImageId: 0 });
            }
          );
        };
        reader.readAsDataURL(file);
      } else {
        alert('Only PNG and JPG images are allowed.');
      }
    }
  }

  addUser() {
    if (this.addUserForm.valid) {
      this.usersDataService.addUser(this.addUserForm.value);
    } else {
      this.authService.snackbarMessage("Make sure all fields are filled out correctly.");
    }
  }
}
