import { TestBed } from '@angular/core/testing';

import { PhotoAnnonceService } from './photo-annonce.service';

describe('PhotoAnnonceService', () => {
  let service: PhotoAnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoAnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
