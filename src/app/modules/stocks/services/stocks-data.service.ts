import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/general/models/api-response';
import { environment } from 'src/environments/environment';
import { StockCompanyWidgetModel } from '../models/stock-company-widget-model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StocksDataService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  public GatherAllCompaniesShortData() : Observable<Array<StockCompanyWidgetModel>>
  {

    return this.httpClient.get<ApiResponse<Array<StockCompanyWidgetModel>>>
    (`${this.baseUrl}${ApiPaths.CompaniesShortData}`)
    .pipe(map((res) =>  {
      return res.response;
    }));
  }
}
