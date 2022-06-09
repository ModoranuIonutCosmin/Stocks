import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PortofolioService } from 'src/app/core/services/portofolio.service';
import { TradeSuggestion } from '../../models/trade-suggestions/trade-suggestion';

@Component({
  selector: 'app-trade-suggest',
  templateUrl: './trade-suggest.component.html',
  styleUrls: ['./trade-suggest.component.scss']
})
export class TradeSuggestComponent implements OnInit {


  @Input() tradeSuggestion!: TradeSuggestion;

  constructor(private portofolioService: PortofolioService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  openTrade(): void {

    this.portofolioService
      .PlaceTransactionOrder(this.tradeSuggestion.openRequest)
      .subscribe((res) => {
        this.snackBar.open('Trade scheduled for opening!', 'OK', {duration: 2000})
      },
      (err) => {
        this.snackBar.open('Failed to place trade!', 'OK', {duration: 2000})
      })
  }

  getPotentialValue(): number {

    var difference = Math.abs(this.tradeSuggestion.currentPrice - this.tradeSuggestion.expectedPrice);

    var percentage = difference / this.tradeSuggestion.currentPrice;

    return this.tradeSuggestion.openRequest.investedAmount + this.tradeSuggestion.openRequest.investedAmount * percentage;
  }
}
