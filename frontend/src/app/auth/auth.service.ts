import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private http: HttpClient) {
    this.autoSignIn();
  }

  isAdminRole(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin';
    } catch (error) {
      console.error('Error parsing token payload', error);
      return false;
    }
  }

  getUserDetailsFromToken(): any {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Log the payload to inspect its structure and content
      console.log('Decoded payload:', payload);
      return {
        firstname: decodeURIComponent(escape(payload.firstname)),
        lastname: decodeURIComponent(escape(payload.lastname)),
        position: payload.position,
        profileImageId: payload.profileImageId
      };
    } catch (error) {
      console.error('Error parsing token payload', error);
      return null;
    }
  }

  autoSignIn() {
    const token = localStorage.getItem('access_token');
    if (token && !this.isTokenExpired(token)) {
      this.isAuth.next(true);
    } else {
      this.isAuth.next(false);
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000; // Convert to seconds
    if (payload.exp < now) {
      localStorage.removeItem('access_token');
      this.isAuth.next(false);
      this.snackbarMessage('Session expired! Please log in again');
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.isAuth.next(false);
    this.snackbarMessage('Log out successful');
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  snackbarMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }

  signIn(formValue: any) {
    this.http.post(`${environment.apiUrl}/auth/login`, { email: formValue.email, password: formValue.password })
      .subscribe({
        next: (res: any) => {
          this.snackbarMessage('Sign in successful!');
          localStorage.setItem('access_token', res.access_token);
          this.isAuth.next(true);
          this.router.navigate(['/dashboard']).then(r => r);
        },
        error: (error) => {
          this.snackbarMessage('Sign in failed');
        }
      });
  }

  signUp(formValue: any) {
    if (!formValue.position) formValue.position = 'product-manager';
    if (!formValue.role) formValue.role = 'admin';
    this.http.post(`${environment.apiUrl}/users/create`, {
      email: formValue.email,
      password: formValue.password,
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      position: formValue.position,
      role: formValue.role
    })
      .subscribe({
        next: (res: any) => {
          this.snackbarMessage('Sign up successful!');
          localStorage.setItem('access_token', res.access_token);
          this.isAuth.next(true);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.snackbarMessage('Sign up failed, make sure you are using a unique email');
        }
      });

  }

  socialLogin(email: string) {
    const formValue = {
      email: email,
      password: '',
      confirmPassword: ''
    };
    this.signIn(formValue);
  }

  socialSignup(email: string, name: string) {
    const formValue = {
      firstname: name,
      lastname: '',
      email: email,
      password: ''
    };
    this.signUp(formValue);
  }
}
