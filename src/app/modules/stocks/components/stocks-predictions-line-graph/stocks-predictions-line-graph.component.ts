import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StocksDataService } from 'src/app/core/services/stocks-data.service';

@Component({
  selector: 'app-stocks-predictions-line-graph',
  templateUrl: './stocks-predictions-line-graph.component.html',
  styleUrls: ['./stocks-predictions-line-graph.component.scss']
})
export class StocksPredictionsLineGraphComponent implements OnInit {

  @Input() ticker: string = 'company';
  @Input() algorithm: string = 'TS_SSA';

  updateFlag: boolean = false;
  public highcharts: any = Highcharts;
  public chartOptions: any = {
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
    this.stocksService
      .gatherCompanyForecastData(this.ticker, 0, 10000, this.algorithm)
      .subscribe((result) => {
        var observations = result.predictions.map((obs) => [
          new Date(obs.date).getTime(),
          obs.price,
        ]);

        this.chartOptions.series[0].data = observations;
        this.updateFlag = true;
      });
  }
}
