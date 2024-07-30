import { TestBed } from '@angular/core/testing';

import { GithubUserDataService } from './github-user-data.service';

describe('GithubUserDataService', () => {
  let service: GithubUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
