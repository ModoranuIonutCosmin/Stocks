import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OHLCPriceValue } from '../../models/ohlcprice-value';
import { StocksDataService } from '../../../../core/services/stocks-data.service';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-stockschart',
  templateUrl: './stockschart.component.html',
  styleUrls: ['./stockschart.component.scss'],
})
export class StockschartComponent implements OnInit {
  @Input() ticker: string = '';

  updateFlag: boolean = false;
  public highcharts: any = Highcharts;
  public chartOptions: any = {
    series: [
      {
        type: 'candlestick',
        data: [
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

        this.chartOptions.series![0]!.data = ohlcValues;
        this.chartOptions.series![0]!.name = 'Price'
        this.updateFlag = true;
        console.log(ohlcValues);
      });
  }

}


