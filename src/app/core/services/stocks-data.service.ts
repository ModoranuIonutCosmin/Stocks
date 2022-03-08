import {HttpClient} from '@angular/common/http';
import {ApiPaths} from 'src/app/api-paths';
import {ApiResponse} from 'src/app/shared/models/api-response';
import {environment} from 'src/environments/environment';
import {StocksSingleCompanyReport} from '../../modules/stocks/models/stocks-single-company-report';
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


  public gatherCompanyData(ticker: string): Observable<StocksSingleCompanyReport> {
    return this.httpClient
      .get<StocksSingleCompanyReport>(`${this.baseUrl}${ApiPaths.CompanyData}/${ticker}`);
  }

  public GatherAllCompaniesShortData(): Observable<Array<StocksSingleCompanyReport>> {

    return this.httpClient.get<Array<StocksSingleCompanyReport>>
    (`${this.baseUrl}${ApiPaths.CompaniesShortData}`)

  }

  public GatherCompanyHistoricalData(ticker: string, interval: string): Observable<HistoricalDataModel> {

    return this.httpClient.get<HistoricalDataModel>
    (`${this.baseUrl}${ApiPaths.CompanyHistoricalDataAll}?ticker=${ticker}&interval=${interval}`);
  }

  public gatherCompanyForecastData(ticker: string, page: number = 0,
                                   count: number = 1000, algorithm: string = 'T_FTO'): Observable<ForecastDataModel> {

    return this.httpClient.get<ForecastDataModel>
    (`${this.baseUrl}${ApiPaths.CompanyForecastDataAll}?ticker=${ticker}&page=${page}&count=${count}&algorithm=${algorithm}`)
  }
}
