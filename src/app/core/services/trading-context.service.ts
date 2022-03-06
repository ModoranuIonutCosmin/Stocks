import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TradingContextModel} from "../../modules/stocks/models/trading-context-model";
import {ApiResponse} from "../../shared/models/api-response";
import {environment} from "../../../environments/environment";
import {ApiPaths} from "../../api-paths";
import {map} from "rxjs/operators";

@Injectable()
export class TradingContextService {

  constructor(private httpClient: HttpClient) {

  }

  currentTradingContext() : Observable<TradingContextModel>{
    return this.httpClient.get<TradingContextModel>(environment.baseUrl +
      ApiPaths.TradingContext);
  }
}
