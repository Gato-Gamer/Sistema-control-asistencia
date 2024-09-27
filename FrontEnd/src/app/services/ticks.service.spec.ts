import { TestBed } from '@angular/core/testing';

import { TicksService } from './ticks.service';

describe('TicksService', () => {
  let service: TicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
