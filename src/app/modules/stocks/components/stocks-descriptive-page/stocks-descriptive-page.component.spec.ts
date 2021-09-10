import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksDescriptivePageComponent } from './stocks-descriptive-page.component';

describe('StocksDescriptivePageComponent', () => {
  let component: StocksDescriptivePageComponent;
  let fixture: ComponentFixture<StocksDescriptivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksDescriptivePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksDescriptivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
