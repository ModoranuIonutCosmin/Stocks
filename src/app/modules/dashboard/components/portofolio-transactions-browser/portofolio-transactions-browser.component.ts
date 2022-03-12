import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AllTransactionsGroupedSummaryModel } from 'src/app/modules/stocks/models/AllTransactionsGroupedSummaryModel';
import { TransactionsCompanyWidgetModel } from 'src/app/modules/stocks/models/TransactionsCompanyWidgetModel';
import { PortofolioService } from 'src/app/core/services/portofolio.service';
import {SpinnerService} from "../../../../core/services/spinner.service";

@Component({
  selector: 'app-portofolio-transactions-browser',
  templateUrl: './portofolio-transactions-browser.component.html',
  styleUrls: ['./portofolio-transactions-browser.component.scss']
})
export class PortofolioTransactionsBrowserComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Market', 'Average Initial', 'Total Invested', 'Total P/L', 'Total P/L%', 'Total units', 'Value', 'Options'];

  TransactionsList!: AllTransactionsGroupedSummaryModel;

  gatherTransactionsData!: Subscription;

  isLoading$: BehaviorSubject<boolean>;

  constructor(private portofolioService: PortofolioService,
    private spinnerService: SpinnerService,
    private router: Router) {
    this.isLoading$ = spinnerService.isLoading$;
    this.TransactionsList = {
      transactions: new Array<TransactionsCompanyWidgetModel>()
    }
  }

  ngOnInit(): void {

    this.gatherTransactionsData = timer(1, 60000).pipe(
      switchMap(() => {
        this.spinnerService.setLoading(true);
        return this.portofolioService.GatherGroupedTransactionsSummary()
      })
    ).subscribe((result) => {
      this.TransactionsList = result;
      this.spinnerService.setLoading(false);
    });
  }

  navigateToTickerTransactions(ticker: string){
    this.router.navigate(['/dashboard/portofolio', ticker]);
  }



  transactionsPresent(): boolean {
    return this.TransactionsList?.transactions?.length > 0
  }
  ngOnDestroy(): void {
    this.gatherTransactionsData.unsubscribe();
  }

}
