import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPanelComponent } from './buy-panel.component';

describe('BuyPanelComponent', () => {
  let component: BuyPanelComponent;
  let fixture: ComponentFixture<BuyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
