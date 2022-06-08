import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Guid} from 'guid-typescript';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {delay, map, shareReplay, switchMap} from 'rxjs/operators';
import {AllTransactionsDetailedDataModel} from 'src/app/modules/stocks/models/AllTransactionsDetailedDataModel';
import {TransactionFullInfo} from 'src/app/modules/stocks/models/TransactionFullInfo';
import {PortofolioService} from 'src/app/core/services/portofolio.service';
import {SpinnerService} from "../../../../core/services/spinner.service";
import { TableColumnDefinition } from 'src/app/shared/models/table-column-definition';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-portofolio-detailed-transactions-browser',
  templateUrl: './portofolio-detailed-transactions-browser.component.html',
  styleUrls: ['./portofolio-detailed-transactions-browser.component.scss']
})
export class PortofolioDetailedTransactionsBrowserComponent implements OnInit, OnDestroy {

  displayedColumns: TableColumnDefinition[] = 
  [{ name: 'Market', showMobile: true },
   { name: 'Units', showMobile: false },
   { name: 'Initial price',showMobile: true },
   { name: 'Current price',showMobile: true },
   { name:  'Invested amount',showMobile: true },
   { name:  'Stop loss',showMobile: false },
   { name:  'Take profit',showMobile: false },
   { name: 'Leverage',showMobile: false },
   { name:  'Total P/L',showMobile: true },
   { name:   'Total P/L%',showMobile: false },
   { name:    'Value',showMobile: true },
   { name:     'Options',     showMobile: true }];

  

  currentTicker!: string;
  transactionsList!: AllTransactionsDetailedDataModel;
  gatherTransactionsData!: Subscription;
  token: string;

  isLoading$ : BehaviorSubject<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  isMobile: boolean = false;

  get columnDefinitions(): string[] {
    return this.displayedColumns
      .filter((val, index) => {
        return !this.isMobile || val.showMobile;
      })
      .map((val) => val.name);
  }

  constructor(private portofolioService: PortofolioService,
              private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private spinnerService: SpinnerService,
              public breakpointObserver: BreakpointObserver) {
    this.token = Guid.create().toString();
    this.isLoading$ = spinnerService.isLoading$;
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(
      params => {
        this.spinnerService.setLoading(true);
        this.currentTicker = params['ticker'];
        this.gatherTransactionsData = timer(1, 60000)
        .pipe(
          switchMap(() =>
            this.portofolioService.GatherTransactionsDetailedOneCompany(this.currentTicker))
        ).subscribe((result) => {
          this.spinnerService.setLoading(false);
          this.transactionsList = result;
        });

      }
    );

    this.isHandset$.subscribe((isMobile) => {
      this.isMobile = isMobile
    })
  }

  closeTransaction(model: TransactionFullInfo) {
    this.portofolioService.CloseTransaction({
      id: model.id,
      token: this.token
    }).subscribe(response => {
      this._snackBar.open(`${model.isBuy ? 'BUY' : 'SELL'} transaction closed successfully.`, 'OK',
        {duration: 4000});

      location.reload();
    }, err => {
        this._snackBar.open('Transaction closing failed.', 'OK');
    })
  }

  ngOnDestroy(): void {
    this.gatherTransactionsData.unsubscribe();
  }

}

