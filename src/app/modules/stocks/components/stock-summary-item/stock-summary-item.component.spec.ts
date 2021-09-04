import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSummaryItemComponent } from './stock-summary-item.component';

describe('StockSummaryItemComponent', () => {
  let component: StockSummaryItemComponent;
  let fixture: ComponentFixture<StockSummaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSummaryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
