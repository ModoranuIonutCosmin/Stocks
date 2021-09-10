import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';

@Component({
  selector: 'app-stock-summary-item',
  templateUrl: './stock-summary-item.component.html',
  styleUrls: ['./stock-summary-item.component.scss']
})
export class StockSummaryItemComponent implements OnInit {
  
  @Input() model! : StockCompanyWidgetModel;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  proceedToTickerPage() : void{
    console.log('Navigating');
    this.router.navigate(['/stocks/summary', this.model.ticker]);
  }
}
