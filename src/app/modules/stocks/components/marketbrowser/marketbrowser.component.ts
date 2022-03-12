import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {StocksSingleCompanyReport} from '../../models/stocks-single-company-report';
import {StocksDataService} from '../../../../core/services/stocks-data.service';
import {
  TradingParametersPanelComponent
} from "../../../../shared/components/trading-parameters-panel/trading-parameters-panel.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Spinner} from "@angular/cli/utilities/spinner";
import {SpinnerService} from "../../../../core/services/spinner.service";

@Component({
  selector: 'app-marketbrowser',
  templateUrl: './marketbrowser.component.html',
  styleUrls: ['./marketbrowser.component.scss']
})
export class MarketbrowserComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  stockMarketList: Array<StocksSingleCompanyReport>;
  displayedColumns: string[] = ['Market', 'Trend', 'Sell', 'Buy', 'Options'];

  gatherMarketData!: Subscription;

  isLoading$: BehaviorSubject<boolean>;
  constructor(private dataService: StocksDataService,
              public dialog: MatDialog,
              private router: Router,
              private spinnerService: SpinnerService,
              private breakpointObserver: BreakpointObserver) {
    this.stockMarketList = new Array<StocksSingleCompanyReport>();
    this.isLoading$ = spinnerService.isLoading$;
  }

  ngOnInit(): void {

    this.gatherMarketData = timer(1, 60000).pipe(
      switchMap(() =>
      {
        this.spinnerService.setLoading(true);
        return this.dataService.GatherAllCompaniesShortData();
      })
    ).subscribe((result) => {
      this.spinnerService.setLoading(false);
      this.stockMarketList = result;
    });
  }


  public handleSell(widgetModel: StocksSingleCompanyReport): void {
    console.log(`Selling for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(TradingParametersPanelComponent);

    dialogRef.componentInstance.companyModel = widgetModel;
    dialogRef.componentInstance.isBuyOrder = false;
    dialogRef.componentInstance.ticker = widgetModel.ticker;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public handleBuy(widgetModel: StocksSingleCompanyReport): void {
    console.log(`Buying for ${widgetModel.ticker}`);

    const dialogRef = this.dialog.open(TradingParametersPanelComponent);

    dialogRef.componentInstance.companyModel = widgetModel;
    dialogRef.componentInstance.isBuyOrder = true;
    dialogRef.componentInstance.ticker = widgetModel.ticker;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public navigateToCompanyPage(tickerData: StocksSingleCompanyReport) {
    this.router.navigate(['/stocks/summary', tickerData.ticker]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gatherMarketData.unsubscribe();
  }
}
