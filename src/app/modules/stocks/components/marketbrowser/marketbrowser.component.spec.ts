import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketbrowserComponent } from './marketbrowser.component';

describe('MarketbrowserComponent', () => {
  let component: MarketbrowserComponent;
  let fixture: ComponentFixture<MarketbrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketbrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
