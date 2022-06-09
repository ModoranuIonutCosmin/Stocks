import { TestBed } from '@angular/core/testing';

import { TradeSuggestionsService } from './trade-suggestions.service';

describe('TradeSuggestionsService', () => {
  let service: TradeSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeSuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
