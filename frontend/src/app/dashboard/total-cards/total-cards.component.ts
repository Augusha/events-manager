import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormatValuePipe} from "../../pipes/format-value.pipe";
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-total-cards',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatIcon,
    NgForOf,
    NgClass,
    TranslateModule,
    FormatValuePipe
  ],
  templateUrl: './total-cards.component.html',
  styleUrl: './total-cards.component.scss'
})
export class TotalCardsComponent implements OnInit {

  cards = [
    { title: 'dashboard.total-events', value: 21324, difference: 2031, icon: "shopping_bag", format: 'number' },
    { title: 'dashboard.total-income', value: 221324.50, difference: -2201, icon: "paid", format: 'currency' },
    { title: 'dashboard.total-sessions', value: 16703, difference: 3392, icon: "people", format: 'number' },
    { title: 'dashboard.conv-rate', value: -12.8, difference: -1.22, icon: "person_check", format: 'percentage' },
  ];

  constructor(private dashboardService: DashboardService) {
  }

  breakpoint: number = 0;

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 750) ? 1 : (window.innerWidth <= 1200) ? 2 : 4;
  }

  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 750) ? 1 : (window.innerWidth <= 1200) ? 2 : 4;
  }

}
