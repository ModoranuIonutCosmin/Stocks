import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTradeDialogComponent } from './confirm-trade-dialog.component';

describe('ConfirmTradeDialogComponent', () => {
  let component: ConfirmTradeDialogComponent;
  let fixture: ComponentFixture<ConfirmTradeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTradeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
