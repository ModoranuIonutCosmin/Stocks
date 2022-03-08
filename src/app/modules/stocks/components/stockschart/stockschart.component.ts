import {Component, Input, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";
import {ChartOptions} from "./chart-options";
import {OHLCPriceValue} from "../../models/ohlcprice-value";
import {StocksDataService} from "../../../../core/services/stocks-data.service";

@Component({
  selector: 'app-stockschart',
  templateUrl: './stockschart.component.html',
  styleUrls: ['./stockschart.component.scss']
})
export class StockschartComponent {
  private _dataSet : OHLCPriceValue[] = []


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;
  @Input() ticker: string = 'company'
  @Input() set dataSet(value: OHLCPriceValue[])
  {
    this._dataSet = value;
    var formattedData = this._dataSet.map(timepoint => {
      return {
        x: timepoint.date,
        y: [timepoint.openValue, timepoint.high, timepoint.low, timepoint.closeValue]
      }
    });

    console.log(formattedData);

    this.chartOptions.series =
      [
        {
          name: "candle",
          data: formattedData
        }
      ]
    this.chartOptions.title = {
        text: "CandleStick Chart for " + this.ticker,
        align: "left"
    }
  }

  constructor(private stocksService: StocksDataService) {
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: [
          ]
        }
      ],
      chart: {
        type: "candlestick",
        height: 350,
        width: 500
      },
      title: {
        text: "CandleStick Chart for " + this.ticker,
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };

  }

  ngAfterViewInit() {
    this.stocksService
      .GatherCompanyHistoricalData(this.ticker, "1d")
      .subscribe(result => {
        this.dataSet = result.timepoints;
      })
  }
}
