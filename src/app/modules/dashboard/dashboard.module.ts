import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PortofolioTransactionsBrowserComponent } from '../dashboard/components/portofolio-transactions-browser/portofolio-transactions-browser.component';
import { MaterialModule } from '../material/material.module';
import { PortofolioService } from '../../core/services/portofolio.service';
import { UserService } from '../../core/services/user.service';
import { PortofolioDetailedTransactionsBrowserComponent } from './components/portofolio-detailed-transactions-browser/portofolio-detailed-transactions-browser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PortofolioTransactionsBrowserComponent,
    PortofolioDetailedTransactionsBrowserComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UserService, PortofolioService]
})
export class DashboardModule { }
