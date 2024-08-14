import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatBadge} from "@angular/material/badge";
import {SidenavService} from "../sidenav/sidenav.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {HeaderService} from "./header.service";
import {AuthService} from "../auth/auth.service";
import {UsersDataService} from "../users/users-data.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatBadge,
    MatButton,
    NgIf,
    FormsModule,
    TranslateModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  firstname: string = '';
  lastname: string = '';
  position: string = '';
  image: string = '';

  constructor(
    private sidenavService: SidenavService,
    private headerService: HeaderService,
    private authService: AuthService,
    private usersDataService: UsersDataService
  ) {
  }

  ngOnInit() {
    const userDetails = this.authService.getUserDetailsFromToken();
    if (userDetails) {
      console.log(userDetails);
      this.firstname = userDetails.firstname;
      this.lastname = userDetails.lastname;
      this.position = userDetails.position;

      if (userDetails.profileImageId && userDetails.profileImageId !== 0) {
        this.usersDataService.getImageById(userDetails.profileImageId).subscribe(
          (imageData: string) => {
            this.image = JSON.parse(imageData).image;
          },
          (error) => {
            this.authService.snackbarMessage("Failed to fetch image");
          }
        );
      }
    }
  }

  get isAuth() {
    return this.authService.isAuth.value;
  }

  get isMenuOpen(): boolean {
    return this.sidenavService.collapsed;
  }

  currentPage(): string {
    return this.headerService.getHeaderTitle();
  }

  toggleMenu() {
    this.sidenavService.collapsed = !this.sidenavService.collapsed;
  }

  setTextColor() {
    return this.sidenavService.sidenavTextColor();
  }

  setColor() {
    return this.sidenavService.sidenavColor();
  }

  setWidth() {
    return this.sidenavService.menuButtonWidth();
  }
}
