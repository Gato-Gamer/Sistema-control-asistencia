import { TestBed } from '@angular/core/testing';

import { TikeoPersonalOrdenadoService } from './tikeo-personal-ordenado.service';

describe('TikeoPersonalOrdenadoService', () => {
  let service: TikeoPersonalOrdenadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TikeoPersonalOrdenadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
