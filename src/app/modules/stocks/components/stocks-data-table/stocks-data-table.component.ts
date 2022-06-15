import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TimestampPrice} from "../../../../shared/models/timestamp-price";
import {StocksDataService} from "../../../../core/services/stocks-data.service";
import {ForecastDataModel} from "../../models/forecast-data-model";
import {debounceTime, distinctUntilChanged, finalize, map, startWith, switchMap, tap} from "rxjs/operators";
import {Subject, timer, flatMap, BehaviorSubject, merge} from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stocks-data-table',
  templateUrl: './stocks-data-table.component.html',
  styleUrls: ['./stocks-data-table.component.scss']
})
export class StocksDataTableComponent implements OnInit, AfterViewInit {
  @Input() ticker!: string;


  isLoading = true;
  displayedColumns: string[] = ['position', 'date', 'price'];
  dataSource = new MatTableDataSource<TimestampPrice>();
  totalCount = 0

  @Input() algorithm: BehaviorSubject<string> = new BehaviorSubject<string>("TS_SSA");

  forecastedPrices: TimestampPrice[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private stocksService: StocksDataService,
    private route: ActivatedRoute) {
    this.ticker = this.route.snapshot.paramMap.get('ticker') || '';

    console.log(`From table ${this.ticker}`)
  }

  ngOnInit() {

  }

  ngAfterViewInit() {


    merge(this.paginator.page, 
      this.algorithm.pipe(debounceTime(500), distinctUntilChanged())
      )
      .pipe(startWith({}),
        tap(() => {
          this.isLoading = true
        }),
        switchMap((alg) => {

        return this.stocksService.gatherCompanyForecastData(this.ticker, this.paginator.pageIndex,
          this.paginator.pageSize, this.algorithm.value);
        }),
        map(result => {
          this.totalCount = result.totalCount

          this.forecastedPrices = result.predictions.map((pred, index) => {
  
            return <TimestampPrice>{
              date: pred.date,
              position: index + this.paginator.pageSize * this.paginator.pageIndex,
              price: pred.price
            }
          })

          return this.forecastedPrices
        }))
      .subscribe((res) => {
        this.dataSource.data = res
        this.isLoading = false;

        console.log(this.paginator.length)
      });
  }




}
