import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatListItem} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
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
    MatError,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  googleProvider: any;
  twitterProvider: any;
  githubProvider: any;

  constructor(
    private authService: AuthService) {
  }

  ngOnInit() {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.googleProvider.addScope('email');
    this.twitterProvider = new firebase.auth.TwitterAuthProvider();
    this.githubProvider = new firebase.auth.GithubAuthProvider();
  }

  signInWithSocial(provider: any) {
    firebase.auth().signInWithPopup(provider).then((result) => {
      let user = result.user!;
      if (user.providerData[0]?.email != null) {
        this.authService.socialLogin(user.providerData[0]?.email);
      }
    }).catch(function(error) {
      console.log(error)
    });
  }

  signInWithGoogle() {
    this.signInWithSocial(this.googleProvider);
  }

  signInWithTwitter() {
    this.signInWithSocial(this.twitterProvider);
  }

  signInWithGitHub() {
    this.signInWithSocial(this.githubProvider);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value);
    } else {
      this.authService.snackbarMessage('Make sure every field is filled out correctly!');
    }
  }
}
