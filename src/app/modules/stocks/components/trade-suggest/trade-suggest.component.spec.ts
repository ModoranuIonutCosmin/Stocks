import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSuggestComponent } from './trade-suggest.component';

describe('TradeSuggestComponent', () => {
  let component: TradeSuggestComponent;
  let fixture: ComponentFixture<TradeSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeSuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
