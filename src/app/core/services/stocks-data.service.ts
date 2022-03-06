import {HttpClient} from '@angular/common/http';
import {ApiPaths} from 'src/app/api-paths';
import {ApiResponse} from 'src/app/shared/models/api-response';
import {environment} from 'src/environments/environment';
import {StockCompanyWidgetModel} from '../../modules/stocks/models/stock-company-widget-model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HistoricalDataModel} from '../../modules/stocks/models/historical-data-model';
import {ForecastDataModel} from '../../modules/stocks/models/forecast-data-model';
import {CompanyModel} from "../../modules/stocks/models/company-model";

@Injectable()
export class StocksDataService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {

  }


  public gatherCompanyData(ticker: string): Observable<CompanyModel> {
    return this.httpClient
      .get<CompanyModel>(`${this.baseUrl}${ApiPaths.CompanyData}/${ticker}`);
  }

  public GatherAllCompaniesShortData(): Observable<Array<StockCompanyWidgetModel>> {

    return this.httpClient.get<Array<StockCompanyWidgetModel>>
    (`${this.baseUrl}${ApiPaths.CompaniesShortData}`)

  }

  public GatherCompanyHistoricalData(ticker: string): Observable<HistoricalDataModel> {

    return this.httpClient.get<HistoricalDataModel>
    (`${this.baseUrl}${ApiPaths.CompanyHistoricalDataAll}?ticker=${ticker}&interval=1d`);
  }

  public gatherCompanyForecastData(ticker: string, page: number = 0,
                                   count: number = 1000, algorithm: string = 'T_FTO'): Observable<ForecastDataModel> {

    return this.httpClient.get<ForecastDataModel>
    (`${this.baseUrl}${ApiPaths.CompanyForecastDataAll}?ticker=${ticker}&page=${page}&count=${count}&algorithm=${algorithm}`)
  }
}
