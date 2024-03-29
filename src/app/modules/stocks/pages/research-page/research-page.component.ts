import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'src/app/modules/dashboard/models/subscription';
import {StocksDataService} from "../../../../core/services/stocks-data.service";
import {StocksSingleCompanyReport} from "../../models/stocks-single-company-report";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.scss']
})
export class ResearchPageComponent implements OnInit {
  companyData: StocksSingleCompanyReport = {
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

  ticker: string = "";
  userSubscription: BehaviorSubject<Subscription>;
  ///
  constructor(private route: ActivatedRoute,
              private stocksService: StocksDataService,
              private subscriptionService: UserService) {
      this.userSubscription = subscriptionService.userSubscription;
  }

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker') || '';

    this.stocksService.gatherCompanyData(this.ticker)
      .subscribe(data => {
        this.companyData = data;
      })

  }

}
