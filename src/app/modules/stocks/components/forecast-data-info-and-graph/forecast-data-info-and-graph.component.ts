import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { StocksDataService } from '../../services/stocks-data.service';

@Component({
  selector: 'app-forecast-data-info-and-graph',
  templateUrl: './forecast-data-info-and-graph.component.html',
  styleUrls: ['./forecast-data-info-and-graph.component.scss']
})
export class ForecastDataInfoAndGraphComponent 
implements OnInit {
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts; // required
  updateFlag = false;


  chartOptions: Highcharts.Options;
  dailyData: Array<[number, number]> = new Array();

  currentTicker : string = "";

  constructor(private dataService: StocksDataService,
    private activatedRoute: ActivatedRoute) {
    this.chartOptions =
    {
      title: {
        text: ''
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
          color: '#FF0000'
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
        this.UpdateCurrentForecastGraph();
      }
    );

  }

  UpdateCurrentForecastGraph() : void {
    this.dataService.GatherCompanyForecastData(this.currentTicker)
      .subscribe(forecastDataInfo => {

        this.dailyData = forecastDataInfo
          .predictions.map((e) => {
            var date: Date = new Date(e.date);

            return [date.getTime(), e.price];
          }
          );

        if (this.chartOptions.series != null
          && this.chartOptions.title != null) {
          this.chartOptions.series[0] = {
            type: 'line',
            data: this.dailyData,
            name: forecastDataInfo.ticker
          };

          this.chartOptions.title.text = `Forecasted prices for ` +
            `${forecastDataInfo.name}`;
        }

        this.updateFlag = true;
      });
  }
}
