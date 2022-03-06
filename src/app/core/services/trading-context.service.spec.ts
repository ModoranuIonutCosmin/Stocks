import { TestBed } from '@angular/core/testing';

import { TradingContextService } from './trading-context.service';

describe('TradingContextService', () => {
  let service: TradingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
