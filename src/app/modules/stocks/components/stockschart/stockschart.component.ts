import {Component, Input, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";
import {OHLCPriceValue} from "../../models/ohlcprice-value";
import {StocksDataService} from "../../../../core/services/stocks-data.service";
import {ChartOptions} from "../../models/chart-options";
import {SpinnerService} from "../../../../core/services/spinner.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-stockschart',
  templateUrl: './stockschart.component.html',
  styleUrls: ['./stockschart.component.scss']
})
export class StockschartComponent {
  @ViewChild("container") container !: HTMLDivElement;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;
  @Input() ticker: string = 'company'
  dataSet: OHLCPriceValue[] = []


  constructor(private stocksService: StocksDataService) {

    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.dataSet.map(timepoint => {
            return {
              x: timepoint.date,
              y: [timepoint.openValue, timepoint.high, timepoint.low, timepoint.closeValue]
            }
          })
        }
      ],
      chart: {
        type: "candlestick",
        height: 350,
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
        this.chart.updateOptions({
          title: {
            text: "CandleStick Chart for " + this.ticker
          }
        })
        this.chartOptions.series = [{
          name: "candle",
          data:  this.dataSet.map(timepoint => {
            return {
              x: timepoint.date,
              y: [timepoint.openValue, timepoint.high, timepoint.low, timepoint.closeValue]
            }
          })

        }]
      })


    setInterval(() => {
      window.dispatchEvent(new Event('resize'))
    }, 1000)

  }

}
