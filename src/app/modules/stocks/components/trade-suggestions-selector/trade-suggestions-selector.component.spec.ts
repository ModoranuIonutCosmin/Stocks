import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSuggestionsSelectorComponent } from './trade-suggestions-selector.component';

describe('TradeSuggestionsSelectorComponent', () => {
  let component: TradeSuggestionsSelectorComponent;
  let fixture: ComponentFixture<TradeSuggestionsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeSuggestionsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeSuggestionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
