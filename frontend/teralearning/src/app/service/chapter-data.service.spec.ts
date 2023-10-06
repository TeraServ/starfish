import { TestBed } from '@angular/core/testing';

import { ChapterDataService } from './chapter-data.service';

describe('ChapterDataService', () => {
  let service: ChapterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
