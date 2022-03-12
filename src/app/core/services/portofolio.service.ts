import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { environment } from 'src/environments/environment';
import { OrderTaxesPreviewModel } from '../../modules/stocks/models/orderPreviewModel';
import { PlaceOrderRequestModel } from '../../modules/stocks/models/PlaceOrderRequestModel';
import { AllTransactionsGroupedSummaryModel } from '../../modules/stocks/models/AllTransactionsGroupedSummaryModel';
import { AllTransactionsDetailedDataModel } from '../../modules/stocks/models/AllTransactionsDetailedDataModel';
import { CloseTransactionRequestModel } from '../../modules/stocks/models/CloseTransactionRequestModel';
import { RefillBalanceRequest } from '../../modules/stocks/models/RefillBalanceRequest';
import { RefillBalanceResponse } from '../../modules/stocks/models/RefillBalanceResponse';

@Injectable()
export class PortofolioService {

  constructor(private httpClient: HttpClient) {

  }

  public gatherBuyOrderTaxesInfo(ticker: string,
                                 leverage: number,
                                 invested: number
  ): Observable<OrderTaxesPreviewModel> {

    return this.httpClient.get<OrderTaxesPreviewModel>
      (`${environment.baseUrl}${ApiPaths.PreviewOrder}?ticker=${ticker}&invested=${invested}` + `&leverage=${leverage}&isBuy=true`);
  }


  public GatherSellOrderTaxes(ticker: string,
    leverage: number,
    invested: number
  ): Observable<OrderTaxesPreviewModel> {

    return this.httpClient.get<OrderTaxesPreviewModel>
      (`${environment.baseUrl}${ApiPaths.PreviewOrder}?ticker=${ticker}&invested=${invested}` + `&leverage=${leverage}&isBuy=false`)
      ;
  }

  public PlaceTransactionOrder(transactionInfo: PlaceOrderRequestModel): Observable<PlaceOrderRequestModel> {

    return this.httpClient
      .post<PlaceOrderRequestModel>(`${environment.baseUrl}${ApiPaths.OrderPost}`,
        transactionInfo);
  }


  public GatherGroupedTransactionsSummary(): Observable<AllTransactionsGroupedSummaryModel> {

    return this.httpClient.get<AllTransactionsGroupedSummaryModel>
      (`${environment.baseUrl}${ApiPaths.TransactionsGrouped}`)
      ;
  }

  public GatherTransactionsDetailedOneCompany(ticker: string): Observable<AllTransactionsDetailedDataModel> {

    return this.httpClient.get<AllTransactionsDetailedDataModel>
      (`${environment.baseUrl}${ApiPaths.TransactionsParticular}${ticker}`);
  }

  public CloseTransaction(requestBody: CloseTransactionRequestModel): Observable<CloseTransactionRequestModel>{
    return this.httpClient
    .post<CloseTransactionRequestModel>(`${environment.baseUrl}${ApiPaths.CloseTransactionPost}`,
    requestBody);
  }

  public RefillBalance(requestBody: RefillBalanceRequest): Observable<RefillBalanceResponse>{
    return this.httpClient
    .post<RefillBalanceResponse>
    (`${environment.baseUrl}${ApiPaths.RefillBalancePost}`,
    requestBody);
  }
}


