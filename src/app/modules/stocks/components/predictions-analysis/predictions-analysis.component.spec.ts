import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsAnalysisComponent } from './predictions-analysis.component';

describe('PredictionsAnalysisComponent', () => {
  let component: PredictionsAnalysisComponent;
  let fixture: ComponentFixture<PredictionsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionsAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
