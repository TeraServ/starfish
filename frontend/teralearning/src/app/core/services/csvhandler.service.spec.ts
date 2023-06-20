import { TestBed } from '@angular/core/testing';

import { CSVHandlerService } from './csvhandler.service';

describe('CSVHandlerService', () => {
  let service: CSVHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
