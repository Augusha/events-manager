import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {FormatValuePipe} from "../../../pipes/format-value.pipe";
import {MatCardContent} from "@angular/material/card";
import Highcharts, {SeriesOptionsType} from "highcharts";
import {HighchartsChartModule} from "highcharts-angular";

@Component({
  selector: 'app-weekly-visitors-chart',
  standalone: true,
  imports: [
    TranslateModule,
    FormatValuePipe,
    MatCardContent,
    HighchartsChartModule
  ],
  templateUrl: './weekly-visitors-chart.component.html',
  styleUrls: ['../../../dashboard/total-cards/total-cards.component.scss', './weekly-visitors-chart.component.css']
})
export class WeeklyVisitorsChartComponent {

  Highcharts: typeof Highcharts = Highcharts;

  chartData = [
    {
      name: 'CL',
      data: [8, 5.5, 8, 8, 6, 4, 4]
    },{
    name: 'FA Cup',
    data: [10, 6.5, 5, 6, 5, 12, 11]
  }];

  chartOptions: Highcharts.Options = {
    colors: [
      'var(--chart-third-line-color)',
      'var(--chart-second-line-color)'
    ],
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: ''
    },
    accessibility: {
      enabled: false,
      description: 'Weekly visitors chart'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      lineColor: 'var(--chart-grid-colo)',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      accessibility: {
        description: 'Days of the week'
      },
      labels: {
        style: {
          color: 'var(--chart-label-color)',
        }
      }
    },
    yAxis: {
      gridLineColor: 'var(--chart-grid-color)',
      min: 0,
      title: {
        text: ''
      },
      labels: {
        enabled: false
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 0
      }
    },
    legend: {
      enabled: false
    },
    series:this.chartData as SeriesOptionsType[]
  };
}
