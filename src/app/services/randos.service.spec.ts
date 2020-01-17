import { TestBed } from '@angular/core/testing';

import { RandosService } from './randos.service';

describe('RandosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandosService = TestBed.get(RandosService);
    expect(service).toBeTruthy();
  });
});
