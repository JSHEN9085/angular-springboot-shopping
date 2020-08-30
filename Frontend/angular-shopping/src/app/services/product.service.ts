import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //product URL
  private baseUrl = 'http://localhost:8080/api/products'; 
  // private baseUrl = 'http://localhost:8080/api/products?size=100'; //if want to fetch 100, by default Spring Boot only return first 20 items

  //Category URL
  private categoryUrl = 'http://localhost:8080/api/product-category'; 


  constructor(private httpClient : HttpClient) { }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`; 
    return this.getProducts(searchUrl); 
    // return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
    //   map(response => response._embedded.products)
    // ); this portion refactored as method getProducts(searchUrl)
  }

  searchProducts(keyword: string): Observable<Product[]> {
    //build url based on http://localhost:8080/api/products/search/findByNameContaining?name=python
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${keyword}`; 
    return this.getProducts(searchUrl); 
    // return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
    //   map(response => response._embedded.products)
    // ); this portion refactored as method getProducts(searchUrl)
  }

  getProduct(productId: number): Observable<Product> {
    //build URL based on productId
    const productUrl = `${this.baseUrl}/${productId}`; 
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    ); 
  }
}

//interface is used to unwrap the JSON from Spring Data REST _embedded entity
interface GetResponseProduct {
  _embedded: {
    products: Product[]; 
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]; 
  }
}
