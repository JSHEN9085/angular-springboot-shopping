import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products'; 
  // private baseUrl = 'http://localhost:8080/api/products?size=100'; //if want to fetch 100, by default Spring Boot only return first 20 items

  constructor(private httpClient : HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`; 

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    ); 
  }
}

interface GetResponse {
  _embedded: {
    products: Product[]; 
  }
}
