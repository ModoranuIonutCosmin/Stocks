import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AllTransactionsDetailedDataModel } from 'src/app/modules/stocks/models/AllTransactionsDetailedDataModel';
import { TransactionFullInfo } from 'src/app/modules/stocks/models/TransactionFullInfo';
import { PortofolioService } from 'src/app/modules/stocks/services/portofolio.service';

@Component({
  selector: 'app-portofolio-detailed-transactions-browser',
  templateUrl: './portofolio-detailed-transactions-browser.component.html',
  styleUrls: ['./portofolio-detailed-transactions-browser.component.scss']
})
export class PortofolioDetailedTransactionsBrowserComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Market', 'Units', 'Initial price', 'Current price', 'Invested amount', 'Stop loss', 'Take profit', 'Leverage', 'Total P/L', 'Total P/L%', 'Value', 'Options'];
  currentTicker!: string;
  TransactionsList! : AllTransactionsDetailedDataModel;
  gatherTransactionsData!: Subscription;
  token: string;

  constructor(private portofolioService: PortofolioService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    ) {
      this.token = Guid.create().toString();
    }
 
  ngOnInit(): void {


    this.activatedRoute.params.subscribe(
      params => {
        this.currentTicker = params['ticker'];
        this.gatherTransactionsData = timer(1, 60000).pipe(
          switchMap(() => 
          
          this.portofolioService.GatherTransactionsDetailedOneCompany(this.currentTicker))
       ).subscribe((result) => {
          this.TransactionsList = result.response;
       });

      }
    );
  }

  closeTransaction(model: TransactionFullInfo){
    this.portofolioService.CloseTransaction({
      id: model.id,
      token: this.token
    }).subscribe(response => {
      if(response.successful){
        this._snackBar.open(`${model.isBuy ? 'BUY' : 'SELL'} transaction closed successfully.`, 'OK', 
        {duration: 4000});

        location.reload();
      } else {
        this._snackBar.open('Transaction closing failed.', 'OK');
      }
    })
  }

  ngOnDestroy(): void {
    this.gatherTransactionsData.unsubscribe();
  }

}

