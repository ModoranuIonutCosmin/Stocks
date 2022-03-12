import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Guid} from 'guid-typescript';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AllTransactionsDetailedDataModel} from 'src/app/modules/stocks/models/AllTransactionsDetailedDataModel';
import {TransactionFullInfo} from 'src/app/modules/stocks/models/TransactionFullInfo';
import {PortofolioService} from 'src/app/core/services/portofolio.service';
import {SpinnerService} from "../../../../core/services/spinner.service";

@Component({
  selector: 'app-portofolio-detailed-transactions-browser',
  templateUrl: './portofolio-detailed-transactions-browser.component.html',
  styleUrls: ['./portofolio-detailed-transactions-browser.component.scss']
})
export class PortofolioDetailedTransactionsBrowserComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Market', 'Units', 'Initial price', 'Current price', 'Invested amount', 'Stop loss', 'Take profit', 'Leverage', 'Total P/L', 'Total P/L%', 'Value', 'Options'];
  currentTicker!: string;
  transactionsList!: AllTransactionsDetailedDataModel;
  gatherTransactionsData!: Subscription;
  token: string;

  isLoading$ : BehaviorSubject<boolean>;

  constructor(private portofolioService: PortofolioService,
              private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private spinnerService: SpinnerService) {
    this.token = Guid.create().toString();
    this.isLoading$ = spinnerService.isLoading$;
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(
      params => {
        this.spinnerService.setLoading(true);
        this.currentTicker = params['ticker'];
        this.gatherTransactionsData = timer(1, 60000).pipe(
          switchMap(() =>

            this.portofolioService.GatherTransactionsDetailedOneCompany(this.currentTicker))
        ).subscribe((result) => {
          this.spinnerService.setLoading(false);
          this.transactionsList = result;
        });

      }
    );
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

