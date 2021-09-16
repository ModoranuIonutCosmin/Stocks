import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/api-paths';
import { ApiResponse } from 'src/app/general/models/api-response';
import { environment } from 'src/environments/environment';
import { OrderTaxesPreviewModel } from '../models/orderPreviewModel';

@Injectable()
export class PortofolioService {

  constructor(private httpClient: HttpClient) { 

  }

  public GatherBuyOrderTaxes(ticker : string,
     leverage: number,
    invested: number
    ) : Observable<ApiResponse<OrderTaxesPreviewModel>>
  {

    return this.httpClient.get<ApiResponse<OrderTaxesPreviewModel>>
    (`${environment.baseUrl}${ApiPaths.BuyOrderGet}?ticker=${ticker}&invested=${invested}`+`&leverage=${leverage}`);
  }


  public GatherSellOrderTaxes(ticker : string,
    leverage: number,
   invested: number
   ) : Observable<OrderTaxesPreviewModel>
 {

   return this.httpClient.get<ApiResponse<OrderTaxesPreviewModel>>
   (`${environment.baseUrl}${ApiPaths.SellOrderGet}?ticker=${ticker}&invested=${invested}`+`&leverage=${leverage}`)
   .pipe(map( result => {
     return result.response;
   }));
 }
}
