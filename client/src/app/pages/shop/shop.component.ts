import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ProductsService } from 'src/app/services/products-service.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  products: Product[] = [];

  addButton: boolean = false;
  pageNumber =this.productsService.pageNumber=1;
  pageSize=6;
  keywords: string = (this.productsService.keyword = '');
  total: number;
  constructor(
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.activateRoute.queryParams.subscribe((query: any) => {
      if (query.keyword) {
        this.keywords = this.productsService.keyword = query.keyword;
        this.productsService
          .loadProducts(this.keywords)
          .subscribe((products) => {
            this.products = products;
          });
      } else {
        this.productsService
          .loadProducts()
          .pipe(takeUntil(this.dispose$))
          .subscribe(
            (products) => {
              this.products = products;
              this.total = products.length;
            },
            (error) => console.error(error)
          );
      }
    });
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.loadProducts();
  }

  add() {}

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
