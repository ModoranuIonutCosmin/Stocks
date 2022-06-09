import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StocksDataService } from 'src/app/core/services/stocks-data.service';

@Component({
  selector: 'app-stocks-predictions-line-graph',
  templateUrl: './stocks-predictions-line-graph.component.html',
  styleUrls: ['./stocks-predictions-line-graph.component.scss']
})
export class StocksPredictionsLineGraphComponent implements OnInit {


  _ticker: string = 'INTC';
  _algorithm: string = 'TS_SSA';

  get ticker() {
    return this._ticker
  }

  get algorithm() {
    return this._algorithm
  }

  @Input() set ticker(value: string)
  {
    this._ticker = value;

    console.log('new ticker ' + value)
    this.updateFlag = false;
    this.updateChart();
  }
  @Input() set algorithm(value: string) {
    this._algorithm = value;

    console.log('new alg ' + value)

    this.updateFlag = false;
    this.updateChart();
  }

  @Output() algoritmChanged: EventEmitter<string> = new EventEmitter<string>();

  updateFlag: boolean = false;
  public highcharts: any = Highcharts;
  public chartOptions: any = {
    title: {
      text: 'Predictions for this algorithm'
    },
    series: [
      {
        type: 'line',
        caption: {
          align: 'left',
          floating: false,
          margin: 15,
          style: { color: '#666666' },
          useHTML: false,
          verticalAlign: 'bottom',
          x: 0,
          y: undefined,
        },
        data: [
        ],
      },
    ],
  };

  constructor(private stocksService: StocksDataService) {}
  ngOnInit(): void {
    this.updateChart();
  }


  updateChart() {
    this.stocksService
    .gatherCompanyForecastData(this.ticker, 0, 10000, this.algorithm)
    .subscribe((result) => {
      var observations = result.predictions.map((obs) => [
        obs.date,
        obs.price,
      ]).reverse();

      this.chartOptions.series[0].data = observations;
      this.updateFlag = true;
    });
  }
}
