import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from 'src/app/directives/only-number.directive';



@NgModule({
  declarations: [
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OnlyNumberDirective
  ]
})
export class DirectivesModule { }
