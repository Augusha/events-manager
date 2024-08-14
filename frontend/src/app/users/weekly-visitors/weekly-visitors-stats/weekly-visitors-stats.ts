import { Component } from '@angular/core';
import {FormatValuePipe} from "../../../pipes/format-value.pipe";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-weekly-visitors-stats',
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
    NgClass
  ],
  templateUrl: './weekly-visitors-stats.html',
  styleUrls: ['../../../dashboard/total-cards/total-cards.component.scss', './weekly-visitors-stats.css']
})
export class WeeklyVisitorsStats {
  cards = [
    { title: 'users.weekly-visitors.unique-visitors.title', subtitle: 'users.weekly-visitors.unique-visitors.subtitle', value: 1340, format: 'none' },
    { title: 'users.weekly-visitors.incoming-events.title', subtitle: 'users.weekly-visitors.incoming-events.subtitle', value: 1.23, format: 'seconds' },
    { title: 'users.weekly-visitors.today-events.title', subtitle: 'users.weekly-visitors.today-events.subtitle', value: 76, format: 'none' },
  ];
}
