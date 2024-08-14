import {Component} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";

@Component({
  selector: 'app-active-events-statistics',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    TranslateModule,
    HighchartsChartModule
  ],
  templateUrl: './active-events-statistics.component.html',
  styleUrls: ['./active-events-statistics.component.css', "../../total-cards/total-cards.component.scss",
    "../dashboard-charts.component.css"]
})
export class ActiveEventsStatisticsComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartData = [
    { name: 'JS Conference', data: [3.5, 1.6, 4, 2, 1.5] },
    { name: 'JAVA Conference', data: [1.5, 7, 2.5, 6, 2.5] },
    { name: 'Frontend Conference', data: [2.5, 4.5, 2, 6.5, 0] },
    { name: 'ART event', data: [0.5, 2.4, 1, 4, 5], }
  ];

  generateSeries() {
    return this.chartData.map(item => ({
      name: item.name,
      data: item.data,
      type: 'spline' as const, // Explicitly typing as a constant string literal
      marker: {
        symbol: 'circle'
      }
    }));
  }

  chartOptions: Highcharts.Options = {
    title: {
      text: ``
    },
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
    },
    colors: [
      'var(--chart-first-line-color)',
      'var(--chart-second-line-color)',
      'var(--chart-third-line-color)',
      'var(--chart-fourth-line-color)'
    ],
    accessibility: {
      enabled: false,
      description: 'Active events statistics chart'
    },
    credits: {
      enabled: false
    },
    series: this.generateSeries(),
    yAxis: {
      gridLineColor: 'var(--chart-grid-color)',
      title: {
        text: ''
      },
      labels: {
        enabled: false
      }
    },
    xAxis: {
      min: 0.5,
      max: 3.5,
      lineColor: 'var(--chart-label-color)',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May'
      ],
      accessibility: {
        description: 'Months of the year'
      },
      labels: {
        style: {
          color: 'var(--chart-label-color)',
        }
      }
    },
    legend: {
      verticalAlign: 'top',
      itemStyle: {
        color: 'var(--chart-label-color)',
      },
      itemHoverStyle: {
        color: 'var(--chart-label-color)',
      }
    },
  };
}
