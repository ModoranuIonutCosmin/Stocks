import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedSubscriptionComponent } from './failed-subscription.component';

describe('FailedSubscriptionComponent', () => {
  let component: FailedSubscriptionComponent;
  let fixture: ComponentFixture<FailedSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
