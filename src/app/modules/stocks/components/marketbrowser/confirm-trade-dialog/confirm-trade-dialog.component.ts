import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmTradeDialogData } from '../../../models/trade-suggestions/confirm-trade-dialog-data';

@Component({
  selector: 'app-confirm-trade-dialog',
  templateUrl: './confirm-trade-dialog.component.html',
  styleUrls: ['./confirm-trade-dialog.component.scss']
})
export class ConfirmTradeDialogComponent implements OnInit {

  confirmForm = this.fb.group({
    investedAmount: [0, Validators.required]
  })

  constructor(
    public dialogRef: MatDialogRef<ConfirmTradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmTradeDialogData,
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
