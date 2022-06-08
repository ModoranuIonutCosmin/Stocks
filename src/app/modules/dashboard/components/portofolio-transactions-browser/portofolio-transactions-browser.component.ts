import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { AllTransactionsGroupedSummaryModel } from 'src/app/modules/stocks/models/AllTransactionsGroupedSummaryModel';
import { TransactionsCompanyWidgetModel } from 'src/app/modules/stocks/models/TransactionsCompanyWidgetModel';
import { PortofolioService } from 'src/app/core/services/portofolio.service';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { TableColumnDefinition } from 'src/app/shared/models/table-column-definition';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-portofolio-transactions-browser',
  templateUrl: './portofolio-transactions-browser.component.html',
  styleUrls: ['./portofolio-transactions-browser.component.scss'],
})
export class PortofolioTransactionsBrowserComponent
  implements OnInit, OnDestroy
{
  displayedColumns: TableColumnDefinition[] = [
    { name: 'Market', showMobile: true },
    { name: 'Average Initial', showMobile: false },
    { name: 'Total Invested', showMobile: true },
    { name: 'Total P/L', showMobile: true },
    { name: 'Total P/L%', showMobile: false },
    { name: 'Total units', showMobile: false },
    { name: 'Value', showMobile: true },
    { name: 'Options', showMobile: true },
  ];


  

  TransactionsList!: AllTransactionsGroupedSummaryModel;

  gatherTransactionsData!: Subscription;

  isLoading$: BehaviorSubject<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  isMobile: boolean = false;

  constructor(
    private portofolioService: PortofolioService,
    private spinnerService: SpinnerService,
    private router: Router,
    public breakpointObserver: BreakpointObserver
  ) {
    this.isLoading$ = spinnerService.isLoading$;
    this.TransactionsList = {
      transactions: new Array<TransactionsCompanyWidgetModel>(),
    };
  }

  ngOnInit(): void {
    this.gatherTransactionsData = timer(1, 60000)
      .pipe(
        switchMap(() => {
          this.spinnerService.setLoading(true);
          return this.portofolioService.GatherGroupedTransactionsSummary();
        })
      )
      .subscribe((result) => {
        this.TransactionsList = result;
        this.spinnerService.setLoading(false);
      });


      this.isHandset$.subscribe((isMobile) => {
        this.isMobile = isMobile
      })
  }

  get columnDefinitions(): string[] {
    return this.displayedColumns
      .filter((val, index) => {
        return !this.isMobile || val.showMobile;
      })
      .map((val) => val.name);
  }

  navigateToTickerTransactions(ticker: string) {
    this.router.navigate(['/dashboard/portofolio', ticker]);
  }

  transactionsPresent(): boolean {
    return this.TransactionsList?.transactions?.length > 0;
  }
  ngOnDestroy(): void {
    this.gatherTransactionsData.unsubscribe();
  }
}
