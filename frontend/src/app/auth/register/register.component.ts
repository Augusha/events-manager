import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatListItem} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatListItem,
    TranslateModule,
    NgIf,
    MatError
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  googleProvider: any;
  twitterProvider: any;
  githubProvider: any;

  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.googleProvider.addScope('email');
    this.twitterProvider = new firebase.auth.TwitterAuthProvider();
    this.githubProvider = new firebase.auth.GithubAuthProvider();
  }

  signUpWithSocial(provider: any) {
    firebase.auth().signInWithPopup(provider).then((result) => {
      let user = result.user!;
      if (user.providerData[0]?.email != null && user.providerData[0]?.displayName != null) {
        this.authService.socialSignup(user.providerData[0]?.email, user.providerData[0]?.displayName);
      }
    }).catch(function(error) {
      console.log(error)
    });
  }

  signUpWithGoogle() {
    this.signUpWithSocial(this.googleProvider);
  }

  signUpWithTwitter() {
    this.signUpWithSocial(this.twitterProvider);
  }

  signUpWithGitHub() {
    this.signUpWithSocial(this.githubProvider);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
        this.authService.signUp(this.registerForm.value);
      } else {
        return this.authService.snackbarMessage('Passwords do not match!');
      }
    } else {
      return this.authService.snackbarMessage('Make sure every field is filled out correctly!');
    }
  }
}
