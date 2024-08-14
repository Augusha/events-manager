import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatNavList} from "@angular/material/list";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {SidenavService} from "./sidenav/sidenav.service";
import {ThemeToggleService} from "./settings/theme-toggle.service";
import {LanguageService} from "./settings/language.service";
import {LoginComponent} from "./auth/login/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    MatSidenavContainer,
    MatNavList,
    RouterLink,
    MatSidenav,
    MatSidenavModule,
    SidenavComponent, LoginComponent, NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor( protected sidenavService: SidenavService,
               private themeToggleService: ThemeToggleService,
               private languageService: LanguageService,
               public router: Router,
               public authService: AuthService) { }

  ngOnInit() {
    this.authService.autoSignIn();
    this.themeToggleService.autoThemeSet();
    this.languageService.autoLanguage();
  }

  toggleMenu() {
    this.sidenavService.collapsed = !this.sidenavService.collapsed;
  }


}
