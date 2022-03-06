import { TestBed } from '@angular/core/testing';

import { StocksDataService } from './stocks-data.service';

describe('StocksDataService', () => {
  let service: StocksDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
