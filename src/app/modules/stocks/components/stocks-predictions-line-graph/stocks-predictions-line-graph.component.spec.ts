import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksPredictionsLineGraphComponent } from './stocks-predictions-line-graph.component';

describe('StocksPredictionsLineGraphComponent', () => {
  let component: StocksPredictionsLineGraphComponent;
  let fixture: ComponentFixture<StocksPredictionsLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksPredictionsLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksPredictionsLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
