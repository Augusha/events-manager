import {Component} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import Highcharts from "highcharts";
import {HighchartsChartModule} from "highcharts-angular";

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    TranslateModule,
    HighchartsChartModule
  ],
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.css', "../../total-cards/total-cards.component.scss",
    "../dashboard-charts.component.css"]
})
export class PopularCategoriesComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartData = [
    {
      name: 'Art',
      y: 60
    }, {
      name: 'Conferences',
      y: 90,
    }, {
      name: 'Series',
      y: 30,
    }
  ];

  chartOptions: Highcharts.Options = {
    title: {
      text: ``
    },
    chart: {
      backgroundColor: 'transparent',
      type: 'pie',
    },
    colors: [
      'var(--chart-first-line-color)',
      'var(--chart-third-line-color)',
      'var(--chart-fourth-line-color)'
    ],
    accessibility: {
      enabled: false,
      description: 'Popular categories chart'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        borderWidth: 5,
        borderRadius: 6,
        borderColor: 'none',
        startAngle: 180,
        showInLegend: true,
      }
    },
    series: [
      {
        name: 'Browsers',
        data: this.chartData,
        type: 'pie',
        innerSize: '60%',

      }],
    legend: {
      verticalAlign: 'top',
      itemStyle: {
        color: 'var(--chart-label-color)',
      },
      itemHoverStyle: {
        color: 'var(--chart-label-color)',
      }
    }
  }
}
