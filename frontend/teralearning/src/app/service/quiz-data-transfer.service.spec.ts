import { TestBed } from '@angular/core/testing';

import { QuizDataTransferService } from './quiz-data-transfer.service';

describe('QuizDataTransferService', () => {
  let service: QuizDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
