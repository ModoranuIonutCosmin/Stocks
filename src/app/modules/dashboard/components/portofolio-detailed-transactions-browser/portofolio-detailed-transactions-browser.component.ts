import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { delay, map, shareReplay, flatMap } from 'rxjs/operators';
import { AllTransactionsDetailedDataModel } from 'src/app/modules/stocks/models/AllTransactionsDetailedDataModel';
import { TransactionFullInfo } from 'src/app/modules/stocks/models/TransactionFullInfo';
import { PortofolioService } from 'src/app/core/services/portofolio.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { TableColumnDefinition } from 'src/app/shared/models/table-column-definition';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-portofolio-detailed-transactions-browser',
  templateUrl: './portofolio-detailed-transactions-browser.component.html',
  styleUrls: ['./portofolio-detailed-transactions-browser.component.scss'],
})
export class PortofolioDetailedTransactionsBrowserComponent
  implements OnInit, OnDestroy
{
  displayedColumns: TableColumnDefinition[] = [
    { name: 'Market', showMobile: true },
    { name: 'Units', showMobile: false },
    { name: 'Initial price', showMobile: true },
    { name: 'Current price', showMobile: true },
    { name: 'Invested amount', showMobile: true },
    { name: 'Stop loss', showMobile: false },
    { name: 'Take profit', showMobile: false },
    { name: 'Leverage', showMobile: false },
    { name: 'Total P/L', showMobile: true },
    { name: 'Total P/L%', showMobile: false },
    { name: 'Value', showMobile: true },
    { name: 'Scheduled open', showMobile: true },
    { name: 'Scheduled close', showMobile: true },
    { name: 'Options', showMobile: true },
  ];

  currentTicker!: string;
  transactionsList!: AllTransactionsDetailedDataModel;
  gatherTransactionsData!: Subscription;
  token: string;

  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private portofolioService: PortofolioService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private _snackBar: MatSnackBar
  ) {
    this.token = Guid.create().toString();
    this.isLoading$ = spinnerService.isLoading$;
    this.currentTicker = this.route.snapshot.paramMap.get('ticker') || '';
  }

  ngOnInit(): void {
    this.gatherTransactionsData = timer(1, 50000)
      .pipe(
        flatMap((res) => {
          this.spinnerService.setLoading(true);

          return this.portofolioService.GatherTransactionsDetailedOneCompany(
            this.currentTicker
          );
        })
      )
      .subscribe((result) => {
        this.spinnerService.setLoading(false);
        this.transactionsList = result;
      });
  }

  closeTransaction(model: TransactionFullInfo) {
    var transactionClosedAlready =
      this.transactionsList.closedTransactions.includes(model);
    var transactionScheduled =
      this.transactionsList.scheduledTransactions.includes(model);

    if (transactionClosedAlready) {
      this._snackBar.open(
        `${model.isBuy ? 'BUY' : 'SELL'} transaction already closed.`,
        'OK',
        { duration: 4000 }
      );

      return;
    }

    if (transactionScheduled) {
      this._snackBar.open(
        `${model.isBuy ? 'BUY' : 'SELL'} transaction schedule canceled.`,
        'OK',
        { duration: 4000 }
      );

      return;
    }

    this.portofolioService
      .CloseTransaction({
        id: model.id,
        token: this.token,
      })
      .subscribe(
        (response) => {
          this._snackBar.open(
            `${model.isBuy ? 'BUY' : 'SELL'} transaction closed successfully.`,
            'OK',
            { duration: 4000 }
          );

          location.reload();
        },
        (err) => {
          this._snackBar.open('Transaction closing failed.', 'OK');
        }
      );
  }

  ngOnDestroy(): void {
    this.gatherTransactionsData.unsubscribe();
  }
}
