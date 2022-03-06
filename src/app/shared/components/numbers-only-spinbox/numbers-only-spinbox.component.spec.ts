import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersOnlySpinboxComponent } from './numbers-only-spinbox.component';

describe('NumbersOnlySpinboxComponent', () => {
  let component: NumbersOnlySpinboxComponent;
  let fixture: ComponentFixture<NumbersOnlySpinboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumbersOnlySpinboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersOnlySpinboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
