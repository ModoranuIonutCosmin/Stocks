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
  ],
  exports:[
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
  },
UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
