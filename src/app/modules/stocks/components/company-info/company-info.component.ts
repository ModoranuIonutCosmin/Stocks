import {Component, Input, OnInit} from '@angular/core';
import {MatGridTile} from "../../models/mat-grid-tile";
import {StocksSingleCompanyReport} from "../../models/stocks-single-company-report";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  @Input() companyInfo: StocksSingleCompanyReport = {
    ticker: '',
    name: '',
    description : '',
    urlLogo : '',
    period : 1000,
    buyPrice : 10,
    sellPrice : 9,
    trend : 0.01,
    timepoint : {
      low: 6,
      high: 12,
      closeValue: 11,
      openValue: 8,
      date: new Date()
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
