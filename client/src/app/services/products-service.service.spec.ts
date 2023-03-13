import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products-service.service';

describe('ProductServiceService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
