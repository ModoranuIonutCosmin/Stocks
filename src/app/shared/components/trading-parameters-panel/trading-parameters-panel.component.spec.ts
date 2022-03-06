import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingParametersPanelComponent } from './trading-parameters-panel.component';

describe('TradingParametersPanelComponent', () => {
  let component: TradingParametersPanelComponent;
  let fixture: ComponentFixture<TradingParametersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingParametersPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingParametersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
