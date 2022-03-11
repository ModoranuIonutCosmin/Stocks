import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TimestampPrice} from "../../../../shared/models/timestamp-price";
import {StocksDataService} from "../../../../core/services/stocks-data.service";
import {ForecastDataModel} from "../../models/forecast-data-model";
import {startWith, tap} from "rxjs/operators";
import {timer} from "rxjs";

@Component({
  selector: 'app-stocks-data-table',
  templateUrl: './stocks-data-table.component.html',
  styleUrls: ['./stocks-data-table.component.scss']
})
export class StocksDataTableComponent implements OnInit, AfterViewInit {
  private _ticker: string = ''
  private _algorithm: string = ''

  get ticker() {
    return this._ticker;
  }

  get algorithm() {
    return this._algorithm;
  }

  isLoading = true;
  displayedColumns: string[] = ['position', 'date', 'price'];
  dataSource = new MatTableDataSource<TimestampPrice>();

  currentPage = 0;
  itemsPerPage = 5;
  totalItemsCount: number = 0;

  @Input() set ticker(value) {
    this._ticker = value;
    this.isLoading = true;
    this.loadPage();
  }
  @Input() set algorithm(value) {
    this._algorithm = value;
    console.log('algorithm changed');
    this.isLoading = true;
    this.loadPage();
  }

  forecastedPrices: TimestampPrice[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  currentAlgorithmIndex: number = 0;
  ALGS_LIST: string[] = ['TS_SSA', 'T_FTO', 'T_SDCA', 'T_FFO', 'T_LBFP']
  ALGS_NAMES: string[] = ['Single spectrum analysis', 'Fast tree tweedie',
    'Stochastic Dual Coordinate Ascent', 'Fast forest', 'Lbfgs Poisson Regression']


  constructor(private stocksService: StocksDataService) {

  }

  ngOnInit() {

  }

  appendResultsToSource(result: ForecastDataModel): void {
    this.forecastedPrices = result.predictions
                    .map((pred, index) : TimestampPrice => {
                      return {
                        date: pred.date,
                        price: pred.price,
                        position: this.currentPage * this.itemsPerPage + index + 1
                      }});
    this.dataSource = new MatTableDataSource(this.forecastedPrices)
  }

  loadPage(): void {
      if (this.ticker == '') {
        return;
      }

      this.stocksService.gatherCompanyForecastData(this.ticker,
        this.currentPage, this.itemsPerPage, this.algorithm)
        .subscribe( result => {
          this.appendResultsToSource(result);
          this.totalItemsCount = result.totalCount
          this.isLoading = false;
        });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadPage()

    this.paginator.page
      .pipe(startWith(null),
        tap(() => {
          this.isLoading = true;
          this.currentPage = this.paginator.pageIndex;
          this.itemsPerPage = this.paginator.pageSize;
          this.loadPage()
        }))
      .subscribe();
  }


  chooseNextAlgorithm() {
    this.currentAlgorithmIndex = (++this.currentAlgorithmIndex) % this.ALGS_LIST.length
    this.algorithm = this.ALGS_LIST[this.currentAlgorithmIndex]
  }
  choosePreviousAlgorithm() {
    this.currentAlgorithmIndex = (--this.currentAlgorithmIndex + this.ALGS_LIST.length) % this.ALGS_LIST.length
    this.algorithm = this.ALGS_LIST[this.currentAlgorithmIndex]
  }
}
