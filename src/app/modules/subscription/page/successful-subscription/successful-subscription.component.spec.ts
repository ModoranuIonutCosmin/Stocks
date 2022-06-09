import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulSubscriptionComponent } from './successful-subscription.component';

describe('SuccessfulSubscriptionComponent', () => {
  let component: SuccessfulSubscriptionComponent;
  let fixture: ComponentFixture<SuccessfulSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
