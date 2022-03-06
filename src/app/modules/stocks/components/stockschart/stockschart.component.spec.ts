import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockschartComponent } from './stockschart.component';

describe('StockschartComponent', () => {
  let component: StockschartComponent;
  let fixture: ComponentFixture<StockschartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockschartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
