import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StocksDataService} from "../../../../core/services/stocks-data.service";
import {StocksSingleCompanyReport} from "../../models/stocks-single-company-report";

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.scss']
})
export class ResearchPageComponent implements OnInit {
  companyData!: StocksSingleCompanyReport

  ///TAB3
  ticker: string = '';
  algorithm: string = 'TS_SSA';

  ///
  constructor(private route: ActivatedRoute,
              private stocksService: StocksDataService) {
  }

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker') || '';

    this.stocksService.gatherCompanyData(this.ticker)
      .subscribe(data => {
        this.companyData = data;
      })

  }

}
