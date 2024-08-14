import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ActiveEventsStatisticsComponent} from "./dashboard-charts/active-events-statistics/active-events-statistics.component";
import {PopularCategoriesComponent} from "./dashboard-charts/popular-categories/popular-categories.component";
import {RecentEventOwnersComponent} from "./recent-event-owners/recent-event-owners.component";
import {NgClass, NgForOf} from "@angular/common";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {TotalCardsComponent} from "./total-cards/total-cards.component";
import {DashboardChartsComponent} from "./dashboard-charts/dashboard-charts.component";
import {HeaderService} from "../header/header.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    ActiveEventsStatisticsComponent,
    PopularCategoriesComponent,
    RecentEventOwnersComponent,
    NgForOf,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCard,
    NgClass,
    MatIcon,
    TotalCardsComponent,
    DashboardChartsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor( private headerService: HeaderService ) {
    this.headerService.setHeaderTitle('dashboard');
  }
}
