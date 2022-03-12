import {Component, Input, OnInit} from '@angular/core';
import {StocksSingleCompanyReport} from "../../models/stocks-single-company-report";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BehaviorSubject, Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  totalColumnsCount = 2;

  @Input() companyInfo: StocksSingleCompanyReport = {
    ticker: '',
    name: '',
    description: '',
    urlLogo: '',
    period: 1000,
    buyPrice: 10,
    sellPrice: 9,
    trend: 0.01,
    timepoint: {
      low: 6,
      high: 12,
      closeValue: 11,
      openValue: 8,
      date: new Date()
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
  }

}
