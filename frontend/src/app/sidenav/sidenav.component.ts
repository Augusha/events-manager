import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {SidenavService} from "./sidenav.service";
import {TranslateModule} from "@ngx-translate/core";
import {HeaderService} from "../header/header.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatSidenavContainer,
    MatNavList,
    MatListItemIcon,
    MatListItem,
    MatListItemTitle,
    RouterLinkActive,
    RouterLink,
    NgForOf,
    TranslateModule,
    NgIf
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService
  ) {}

  navItems = [
    {name: 'sidenav.dashboard', icon: 'home', route: 'dashboard', label: 'Dashboard'},
    {name: 'sidenav.events', icon: 'flag', route: 'events', label: 'Events'},
    {name: 'sidenav.reports', icon: 'dashboard', route: 'reports', label: 'Reports&Analytics'},
    {name: 'sidenav.inbox', icon: 'mail', route: 'inbox', label: 'Inbox'},
    {name: 'sidenav.media', icon: 'photo library', route: 'media', label: 'Media'},
    {name: 'sidenav.users', icon: 'group', route: 'users', label: 'Users'},
    {name: 'sidenav.settings', icon: 'settings', route: 'settings', label: 'Settings'}
  ];

  toggleMenu() {
    this.sidenavService.collapsed = !this.sidenavService.collapsed;
  }

  get isAuth() {
    return this.authService.isAuth.value;
  }

  logOut() {
    this.authService.logOut();
  }
}
