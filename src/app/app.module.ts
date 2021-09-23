import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './AuthHttpInterceptor';
import { UserService } from './modules/auth/services/user.service';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { DirectivesModule } from './modules/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { PortofolioService } from './modules/stocks/services/portofolio.service';
import { LoggedGuard } from './AuthGuards/logged-guard';

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
    FormsModule
  ],
  exports:[
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
  },
UserService,
PortofolioService,
LoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
