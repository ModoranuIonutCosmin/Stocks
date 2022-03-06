import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/AuthHttpInterceptor';
import { UserService } from './core/services/user.service';
import { DirectivesModule } from './modules/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { PortofolioService } from './core/services/portofolio.service';
import { LoggedGuard } from './core/guard/logged-guard';
import {PlaceOrderService} from "./core/services/place-order.service";
import {TradingContextService} from "./core/services/trading-context.service";

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
  ],
    exports: [
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
UserService,
PortofolioService,
    PlaceOrderService,
    TradingContextService,
LoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
