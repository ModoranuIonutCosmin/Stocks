import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortofolioDetailedTransactionsBrowserComponent } from './portofolio-detailed-transactions-browser.component';

describe('PortofolioDetailedTransactionsBrowserComponent', () => {
  let component: PortofolioDetailedTransactionsBrowserComponent;
  let fixture: ComponentFixture<PortofolioDetailedTransactionsBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortofolioDetailedTransactionsBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortofolioDetailedTransactionsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
