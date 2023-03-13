import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  keyword: string;
  pageSize: number;
  pageNumber: number;

  loadProducts(_keywords?: string) {
    let params = new HttpParams()
      .append('pageNumber', `${this.pageNumber}`)
      .append('pageSize', `${this.pageSize}`)
      .append('keyword', `${this.keyword}`)
    return this.http.get<Product[]>(`${environment.apiUrl}/products?${params}`);
  }

  loadProduct(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
}
