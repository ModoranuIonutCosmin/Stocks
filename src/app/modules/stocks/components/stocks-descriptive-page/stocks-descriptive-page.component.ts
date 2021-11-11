import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import * as Highcharts from 'highcharts';
import { StocksDataService } from '../../services/stocks-data.service';


@Component({
  selector: 'app-stocks-descriptive-page',
  templateUrl: './stocks-descriptive-page.component.html',
  styleUrls: ['./stocks-descriptive-page.component.scss']
})
export class StocksDescriptivePageComponent implements OnInit {
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts; // required
  updateFlag = false;


  dailyChartOptions: Highcharts.Options;
  dailyData: Array<[number, number]> = new Array();

  currentTicker : string = "";

  constructor(private dataService: StocksDataService,
    private activatedRoute: ActivatedRoute) {
    this.dailyChartOptions =
    {
      title: {
        text: 'hallo'
      },
      navigator: {
        enabled: true,
        xAxis: {
          
        }
      },
      series: [
        {
          type: 'line',
          data: this.dailyData,
          color: '#00eeff'
        }
      ],
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function () {
            if (typeof this.value == 'number') {
              return Highcharts.dateFormat('%b/%e/%Y', this.value);
            }

            return Highcharts.dateFormat('%b/%e/%Y', parseInt(this.value));
          },
        },
        zoomEnabled: true
      },
    };
  }

  ngOnInit(): void {

    // {
    //   name: 'aapl',
    //   type: 'line',
    //   data: ,
    //   showInNavigator: true
    // }
    this.activatedRoute.params.subscribe(
      params => {
        this.currentTicker = params['ticker'];
        this.UpdateCurrentHistoricalGraph();
      }
    );

  }

  UpdateCurrentHistoricalGraph() : void {
    this.dataService.GatherCompanyHistoricalData(this.currentTicker)
      .subscribe(historicalDataInfo => {

        this.dailyData = historicalDataInfo
          .timepoints.map((e, index) => {
            var date: Date = new Date(e.date);

            return [date.getTime(), e.closeValue];
          }
          );

        if (this.dailyChartOptions.series != null
          && this.dailyChartOptions.title != null) {
          this.dailyChartOptions.series[0] = {
            type: 'line',
            data: this.dailyData,
            name: historicalDataInfo.ticker
          };

          this.dailyChartOptions.title.text = `Historical prices for ` +
            `${historicalDataInfo.name}`;
        }

        this.updateFlag = true;
      });
  }

}
