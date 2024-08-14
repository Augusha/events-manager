import {Component, OnInit} from '@angular/core';
import {ActiveEventsStatisticsComponent} from "./active-events-statistics/active-events-statistics.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {PopularCategoriesComponent} from "./popular-categories/popular-categories.component";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [
    ActiveEventsStatisticsComponent,
    MatGridList,
    MatGridTile,
    PopularCategoriesComponent,
    MatCard,
    MatCardContent
  ],
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css', "../total-cards/total-cards.component.scss"]
})
export class DashboardChartsComponent implements OnInit{

  breakpoint: number = 2;
  gridHeight: string = "400px";

  activeEvents = 1;

  changeSize(){
    if(window.innerWidth <= 1100) {
      this.breakpoint = 1;
      this.activeEvents = 1;
    } else {
      this.breakpoint = 3;
      this.activeEvents = 2;
    }
  }

  ngOnInit() {
    this.changeSize();
  }

  onResize(event: any) {
    this.changeSize();
  }

}
