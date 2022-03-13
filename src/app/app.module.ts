import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './core/interceptors/AuthHttpInterceptor';
import {UserService} from './core/services/user.service';
import {DirectivesModule} from './modules/directives/directives.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PortofolioService} from './core/services/portofolio.service';
import {LoggedGuard} from './core/guard/logged-guard';
import {PlaceOrderService} from "./core/services/place-order.service";
import {TradingContextService} from "./core/services/trading-context.service";
import {SharedModule} from "./modules/shared/shared.module";
import {SpinnerService} from "./core/services/spinner.service";
import {ServerDownInterceptor} from "./core/interceptors/server-down.interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    DirectivesModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerDownInterceptor,
      multi: true
    },
    UserService,
    PortofolioService,
    PlaceOrderService,
    TradingContextService,
    SpinnerService,
    LoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
