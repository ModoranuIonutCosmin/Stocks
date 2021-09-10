import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDataInfoAndGraphComponent } from './forecast-data-info-and-graph.component';

describe('ForecastDataInfoAndGraphComponent', () => {
  let component: ForecastDataInfoAndGraphComponent;
  let fixture: ComponentFixture<ForecastDataInfoAndGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastDataInfoAndGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDataInfoAndGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
