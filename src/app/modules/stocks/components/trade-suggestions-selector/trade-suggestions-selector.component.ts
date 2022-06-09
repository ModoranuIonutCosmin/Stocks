import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TradeSuggestionsService } from 'src/app/core/services/trade_suggestions/trade-suggestions.service';
import { TradeSuggestion } from '../../models/trade-suggestions/trade-suggestion';

@Component({
  selector: 'app-trade-suggestions-selector',
  templateUrl: './trade-suggestions-selector.component.html',
  styleUrls: ['./trade-suggestions-selector.component.scss']
})
export class TradeSuggestionsSelectorComponent implements OnInit {
  _algorithm: string = "";
  _interval: string = "1d";

  @Input() ticker!: string;

  get algorithm(): string {

    return this._algorithm;
  }

  @Input() set algorithm(value) {
    this._algorithm = value;

    this.loadSuggestions()
  }

  ALGS_LIST: string[] = ['TS_SSA', 'T_FTO', 'T_SDCA', 'T_FFO', 'T_LBFP']
  INTERVAL_LIST: string[] = ['1h', '6h', '1d', '3d', '5d']

  tradeSuggestions: TradeSuggestion[] = [];

  get interval(): string {

    return this._interval;
  }

  @Input() set interval(value) {
    this._interval = value;

    this.loadSuggestions()
  }
  form = this.fb.group({
    interval: [this.interval, [Validators.required]],
    algorithm: [this.algorithm, [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private tradeSuggestionsService: TradeSuggestionsService) {
  }

  ngOnInit(): void {

  }

  loadSuggestions(): void {
    this.tradeSuggestionsService
    .gatherTradeSuggestions(this.ticker, this.algorithm, this.interval)
    .subscribe((res) => this.tradeSuggestions = res)
  }

}
