import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  product: Product | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct() {
    this.productsService
      .loadProduct(this.activatedRoute.snapshot.params['id'])
      .pipe(takeUntil(this.dispose$))
      .subscribe(
        (product) => (this.product = product),
        (error) => console.error(error)
      );
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
