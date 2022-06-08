import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { OHLCPriceValue } from '../../models/ohlcprice-value';
import { StocksDataService } from '../../../../core/services/stocks-data.service';
import { ChartOptions } from '../../models/chart-options';
import { Subscription, timer } from 'rxjs';
import * as Highcharts from 'highcharts/highstock';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-stockschart',
  templateUrl: './stockschart.component.html',
  styleUrls: ['./stockschart.component.scss'],
})
export class StockschartComponent implements OnInit {
  @Input() ticker: string = 'company';
  dataSet: OHLCPriceValue[] = [];

  updateFlag: boolean = false;
  public highcharts: any = Highcharts;
  public chartOptions: any = {
    series: [
      {
        type: 'candlestick',
        caption: {
          align: 'left',
          floating: false,
          margin: 15,
          style: { color: '#666666' },
          text: 'hah',
          useHTML: false,
          verticalAlign: 'bottom',
          x: 0,
          y: undefined,
        },
        data: [
          [1521466200000, 177.32, 177.47, 173.66, 175.3],
          [1521552600000, 175.24, 176.8, 174.94, 175.24],
          [1521639000000, 175.04, 175.09, 171.26, 171.27],
          [1521725400000, 170, 172.68, 168.6, 168.85],
        ],
      },
    ],
  };

  constructor(private stocksService: StocksDataService) {}
  ngOnInit(): void {
    this.stocksService
      .GatherCompanyHistoricalData(this.ticker, '1d')
      .subscribe((result) => {
        var ohlcValues = result.timepoints.map((obs) => [
          new Date(obs.date).getTime(),
          obs.openValue,
          obs.high,
          obs.low,
          obs.closeValue,
        ]);

        this.chartOptions.series[0].data = ohlcValues;
        this.updateFlag = true;
        console.log(ohlcValues);
      });
  }
}
