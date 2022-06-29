import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PlaceOrderService } from 'src/app/core/services/place-order.service';
import { PortofolioService } from 'src/app/core/services/portofolio.service';
import { TradeSuggestionsService } from 'src/app/core/services/trade_suggestions/trade-suggestions.service';
import { ConfirmTradeDialogData } from '../../models/trade-suggestions/confirm-trade-dialog-data';
import { TradeSuggestion } from '../../models/trade-suggestions/trade-suggestion';
import { ConfirmTradeDialogComponent } from '../marketbrowser/confirm-trade-dialog/confirm-trade-dialog.component';

@Component({
  selector: 'app-trade-suggestions-selector',
  templateUrl: './trade-suggestions-selector.component.html',
  styleUrls: ['./trade-suggestions-selector.component.scss'],
})
export class TradeSuggestionsSelectorComponent implements OnInit {
  _interval: string = '1d';
  _algorithm: string  = 'TS_SSA';

  ticker: string;

  displayedColumns = ['CompanyData', 'PositionType', 'InitialPrice', 'FinalPrice', 'ProfitPercentage', 'Start', 'Final', 'Action']

  ALGS_LIST: string[] = ['TS_SSA', 'T_FTO', 'T_SDCA', 'T_FFO', 'T_LBFP'];
  INTERVAL_LIST: string[] = ['1h', '6h', '1d', '3d', '5d'];

  tradeSuggestions: TradeSuggestion[] = [];

  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private tradeSuggestionsService: TradeSuggestionsService,
    private portofolioService: PortofolioService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this.ticker = this.route.snapshot.paramMap.get('ticker') || '';
    this.form = this.fb.group({
      interval: [this._interval, [Validators.required]],
      algorithm: [this._algorithm, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadSuggestions()
  }

  loadSuggestions(): void {
    this.tradeSuggestionsService
      .gatherTradeSuggestions(this.ticker, this._algorithm, this._interval)
      .subscribe((res) => (this.tradeSuggestions = res));
  }

  openConfirmationDialog(suggestion: TradeSuggestion): void {
    const dialogRef = this.dialog.open(ConfirmTradeDialogComponent, {
      width: '350px',
      data: {
        investedAmount: suggestion.openRequest.investedAmount,
        suggestion: suggestion
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      var resultData = <ConfirmTradeDialogData> result

      resultData.suggestion.openRequest.stopLossAmount = result.suggestion.openRequest.investedAmount * 3 / 4
      
      if (resultData != undefined) {
        this.portofolioService
          .PlaceTransactionOrder(resultData.suggestion.openRequest)
          .subscribe((res) => {
            this.snackbar.open('Transaction scheduled successfully', 'OK', {duration: 3000})

            for (var entry of this.tradeSuggestions) {
              if (entry.openRequest.token == res.token) {
                entry.disabled = true
                break;
              }
            }
          }
          ,
          (err) => {
            this.snackbar.open(`Transaction didn\'t get scheduled. Error: ${err.error.detail}.`,
             'OK', {duration: 1000})
          });
      }
    });
  }

  algorithmChanged(event: MatSelectChange) {
    this._algorithm = event.value
    this.loadSuggestions()
  }

  intervalChanged(event: MatSelectChange) {
    this._interval = event.value
    this.loadSuggestions()
  }

  profitValuePercentage(suggestion: TradeSuggestion) {
    var difference = Math.abs(suggestion.currentPrice - suggestion.expectedPrice)

    return difference / suggestion.currentPrice
  }
}
