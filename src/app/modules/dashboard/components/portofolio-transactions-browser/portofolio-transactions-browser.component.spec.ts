import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortofolioTransactionsBrowserComponent } from './portofolio-transactions-browser.component';

describe('PortofolioTransactionsBrowserComponent', () => {
  let component: PortofolioTransactionsBrowserComponent;
  let fixture: ComponentFixture<PortofolioTransactionsBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortofolioTransactionsBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortofolioTransactionsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
