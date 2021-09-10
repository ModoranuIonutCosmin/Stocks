import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDataInfoAndGraphComponent } from './historical-data-info-and-graph.component';

describe('HistoricalDataInfoAndGraphComponent', () => {
  let component: HistoricalDataInfoAndGraphComponent;
  let fixture: ComponentFixture<HistoricalDataInfoAndGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalDataInfoAndGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDataInfoAndGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
