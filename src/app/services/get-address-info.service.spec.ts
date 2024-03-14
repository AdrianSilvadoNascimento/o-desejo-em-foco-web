import { TestBed } from '@angular/core/testing';

import { GetAddressInfoService } from './get-address-info.service';

describe('GetAddressInfoService', () => {
  let service: GetAddressInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAddressInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
