import {Component, OnInit} from '@angular/core';
import {AllUsersComponent} from "./all-users/all-users.component";
import {WeeklyVisitorsComponent} from "./weekly-visitors/weekly-visitors.component";
import {RecentEventOwnersComponent} from "../dashboard/recent-event-owners/recent-event-owners.component";
import {HeaderService} from "../header/header.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AllUsersComponent,
    WeeklyVisitorsComponent,
    RecentEventOwnersComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  constructor( private headerService: HeaderService) {
    this.headerService.setHeaderTitle('users');
  }
}
