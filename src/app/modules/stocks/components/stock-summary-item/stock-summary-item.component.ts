import { Component, Input, OnInit } from '@angular/core';
import { StockCompanyWidgetModel } from '../../models/stock-company-widget-model';

@Component({
  selector: 'app-stock-summary-item',
  templateUrl: './stock-summary-item.component.html',
  styleUrls: ['./stock-summary-item.component.scss']
})
export class StockSummaryItemComponent implements OnInit {
  
  @Input() model! : StockCompanyWidgetModel;
  
  constructor() { }

  ngOnInit(): void {
  }

}
