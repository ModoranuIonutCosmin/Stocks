import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from 'src/app/api-paths';
import { TradeSuggestion } from 'src/app/modules/stocks/models/trade-suggestions/trade-suggestion';
import { environment } from 'src/environments/environment';

@Injectable()
export class TradeSuggestionsService {

  constructor(private httpClient: HttpClient) {

  }

  gatherTradeSuggestions(ticker: string, algorithm: string, interval: string) {
    return this.httpClient
      .get<TradeSuggestion[]>(environment.baseUrl + ApiPaths.GetTradeSuggestions + `?ticker=${ticker}&algorithm=${algorithm}&interval=${interval}`)
  }
}
