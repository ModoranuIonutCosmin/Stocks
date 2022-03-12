import { TestBed } from '@angular/core/testing';

import { ServerDownInterceptor } from './server-down.interceptor';

describe('ServerDownInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerDownInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerDownInterceptor = TestBed.inject(ServerDownInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
