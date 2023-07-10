import { TestBed } from '@angular/core/testing';

import { TeralearnTitleStrategyService } from './teralearn-title-strategy.service';

describe('TeralearnTitleStrategyService', () => {
  let service: TeralearnTitleStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeralearnTitleStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
