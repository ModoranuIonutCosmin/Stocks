import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NumbersOnlySpinboxComponent} from "../../shared/components/numbers-only-spinbox/numbers-only-spinbox.component";
import {
  TradingParametersPanelComponent
} from "../../shared/components/trading-parameters-panel/trading-parameters-panel.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {StocksDataTableComponent} from "../../shared/components/stocks-data-table/stocks-data-table.component";



@NgModule({
  declarations: [
    NumbersOnlySpinboxComponent,
    TradingParametersPanelComponent,
    StocksDataTableComponent,

  ],
    exports: [
        TradingParametersPanelComponent,
        StocksDataTableComponent,
        NumbersOnlySpinboxComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
