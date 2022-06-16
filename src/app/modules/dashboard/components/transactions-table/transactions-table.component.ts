import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TransactionFullInfo } from 'src/app/modules/stocks/models/TransactionFullInfo';
import { TableColumnDefinition } from 'src/app/shared/models/table-column-definition';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {


  get columnDefinitions(): string[] {
    return this.displayedColumns
      .filter((val, index) => {
        return !this.isMobile || val.showMobile;
      })
      .map((val) => val.name);
  }

  @Input() displayedColumns: TableColumnDefinition[] = [];
  @Input() transactionsList:  Array<TransactionFullInfo> = [];
  @Output() closeTransactionEmitter: EventEmitter<TransactionFullInfo> = 
            new EventEmitter<TransactionFullInfo>();

  isMobile: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(public breakpointObserver: BreakpointObserver) { }


  dateIsNotNull(date: Date) {
    console.log(date)
    return new Date(date) > new Date(2000, 1, 1)
  }

  ngOnInit(): void {
    this.isHandset$.subscribe((isMobile) => {
      this.isMobile = isMobile
    })
  }

}
