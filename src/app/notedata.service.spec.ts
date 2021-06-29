import { TestBed } from '@angular/core/testing';

import { NotedataService } from './notedata.service';

describe('NotedataService', () => {
  let service: NotedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
