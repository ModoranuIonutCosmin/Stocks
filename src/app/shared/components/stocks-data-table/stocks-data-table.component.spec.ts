import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksDataTableComponent } from './stocks-data-table.component';

describe('StocksDataTableComponent', () => {
  let component: StocksDataTableComponent;
  let fixture: ComponentFixture<StocksDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
