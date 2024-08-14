import {Component, OnInit} from '@angular/core';
import {FormatValuePipe} from "../../pipes/format-value.pipe";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {WeeklyVisitorsStats} from "./weekly-visitors-stats/weekly-visitors-stats";
import {WeeklyVisitorsChartComponent} from "./weekly-visitors-chart/weekly-visitors-chart.component";
import {
  ActiveEventsStatisticsComponent
} from "../../dashboard/dashboard-charts/active-events-statistics/active-events-statistics.component";
import {
  PopularCategoriesComponent
} from "../../dashboard/dashboard-charts/popular-categories/popular-categories.component";

@Component({
  selector: 'app-weekly-visitors',
  standalone: true,
  imports: [
    FormatValuePipe,
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatIcon,
    NgForOf,
    TranslateModule,
    NgClass,
    WeeklyVisitorsStats,
    WeeklyVisitorsChartComponent,
    ActiveEventsStatisticsComponent,
    PopularCategoriesComponent
  ],
  templateUrl: './weekly-visitors.component.html',
  styleUrls: ['../../dashboard/total-cards/total-cards.component.scss','./weekly-visitors.component.css']
})
export class WeeklyVisitorsComponent implements OnInit {

  breakpoint: number = 2;
  gridHeight: string = "400px";

  activeEvents = 1;

  changeSize(){
    if(window.innerWidth <= 1200) {
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
