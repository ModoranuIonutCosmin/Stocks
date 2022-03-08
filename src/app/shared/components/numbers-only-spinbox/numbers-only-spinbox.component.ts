import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradingParametersPanelComponent} from "../trading-parameters-panel/trading-parameters-panel.component";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-numbers-only-spinbox',
  templateUrl: './numbers-only-spinbox.component.html',
  styleUrls: ['./numbers-only-spinbox.component.scss'],
  viewProviders: [
    {
      provide: TradingParametersPanelComponent,
      useExisting: FormGroupDirective
    }
  ]
})
export class NumbersOnlySpinboxComponent implements OnInit {

  @Input() controlName: string = '';
  @Input() maxValue = Number.MAX_SAFE_INTEGER;
  @Input() minValue = Number.MIN_SAFE_INTEGER;
  @Input() step: number = 10;
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  @Input() parentForm!: FormGroup;
  @Input() label: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  increaseAmount() {
    this.value = Math.min(this.maxValue, this.value + this.step);
    this.updateValues();
  }

  decreaseAmount() {
    this.value = Math.max(this.minValue, this.value - this.step);
    this.updateValues();
  }

  updateValues() {
    this.parentForm.controls[this.controlName].setValue(this.value);
    this.valueChanged(this.value)
  }


  valueChanged(event: any) {
    if (isNaN(event)) {
      this.value = event.target.value;
    } else {
      this.value = event;
    }
    console.log(this.value);
    console.log(this.maxValue);
    if (this.value > this.maxValue) {
      this.value = this.maxValue;
    }
    this.valueChange.emit(this.value);
  }
}
