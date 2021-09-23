import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/general/models/api-response';
import { environment } from 'src/environments/environment';
import { OrderTaxesPreviewModel } from '../models/orderPreviewModel';
import { PlaceOrderRequestModel } from '../models/PlaceOrderRequestModel';
import { AllTransactionsGroupedSummaryModel } from '../models/AllTransactionsGroupedSummaryModel';
import { AllTransactionsDetailedDataModel } from '../models/AllTransactionsDetailedDataModel';
import { CloseTransactionRequestModel } from '../models/CloseTransactionRequestModel';
import { RefillBalanceRequest } from '../models/RefillBalanceRequest';
import { RefillBalanceResponse } from '../models/RefillBalanceResponse';

@Injectable()
export class PortofolioService {

  constructor(private httpClient: HttpClient) {

  }

  public GatherBuyOrderTaxes(ticker: string,
    leverage: number,
    invested: number
  ): Observable<ApiResponse<OrderTaxesPreviewModel>> {

    return this.httpClient.get<ApiResponse<OrderTaxesPreviewModel>>
      (`${environment.baseUrl}${ApiPaths.BuyOrderGet}?ticker=${ticker}&invested=${invested}` + `&leverage=${leverage}`);
  }


  public GatherSellOrderTaxes(ticker: string,
    leverage: number,
    invested: number
  ): Observable<ApiResponse<OrderTaxesPreviewModel>> {

    return this.httpClient.get<ApiResponse<OrderTaxesPreviewModel>>
      (`${environment.baseUrl}${ApiPaths.SellOrderGet}?ticker=${ticker}&invested=${invested}` + `&leverage=${leverage}`)
      ;
  }

  public PlaceTransactionOrder(transactionInfo: PlaceOrderRequestModel): Observable<ApiResponse<PlaceOrderRequestModel>> {

    return this.httpClient
      .post<ApiResponse<PlaceOrderRequestModel>>(`${environment.baseUrl}${ApiPaths.OrderPost}`,
        transactionInfo);
  }


  public GatherGroupedTransactionsSummary(): Observable<ApiResponse<AllTransactionsGroupedSummaryModel>> {

    return this.httpClient.get<ApiResponse<AllTransactionsGroupedSummaryModel>>
      (`${environment.baseUrl}${ApiPaths.TransactionsGrouped}`)
      ;
  }

  public GatherTransactionsDetailedOneCompany(ticker: string): Observable<ApiResponse<AllTransactionsDetailedDataModel>> {

    return this.httpClient.get<ApiResponse<AllTransactionsDetailedDataModel>>
      (`${environment.baseUrl}${ApiPaths.TransactionsParticular}${ticker}`);
  }

  public CloseTransaction(requestBody: CloseTransactionRequestModel): Observable<ApiResponse<CloseTransactionRequestModel>>{
    return this.httpClient
    .post<ApiResponse<CloseTransactionRequestModel>>(`${environment.baseUrl}${ApiPaths.CloseTransactionPost}`,
    requestBody);
  }

  public RefillBalance(requestBody: RefillBalanceRequest): Observable<ApiResponse<RefillBalanceResponse>>{
    return this.httpClient
    .post<ApiResponse<RefillBalanceResponse>>
    (`${environment.baseUrl}${ApiPaths.RefillBalancePost}`,
    requestBody);
  }
}


