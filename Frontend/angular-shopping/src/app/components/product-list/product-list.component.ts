import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service'; 
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []; 
  previousCategoryId: number = 1;
  currentCategoryId: number = 1; 
  searchMode: boolean = false; 
  //properties for pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0; 

  previousKeyword: string = null; 


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => 
    this.listProducts()); 
  }


  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword'); //must use 'keyword' here as we define path: 'search/:keyword' in app.module
    if(this.searchMode){
      this.handleSearchProducts(); 
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts(){
    //check if "id" parameter is available 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); 

    if(hasCategoryId){
      //get the "id" param string, convert string to a number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id'); 
    } else {
      //if no id is available, default it as 1
      this.currentCategoryId = 1; 
    }

    //check if we have a different category Id
    //if we have a different category id than previous, then set the pageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1; 
    }
    this.previousCategoryId = this.currentCategoryId;
    // console.log(this.previousCategoryId, this.pageNumber);
    
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     // console.log(data);
    //     this.products = data; 
    //   }
    // )

    //call backend to get products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1,
                                               this.pageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult())
  }

  processResult() {
    return data => {
      //be careful with the name between backend returned name, properties assigned in this class, and data blinding in HTML page
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1; 
      this.pageSize = data.page.size; 
      this.totalElements = data.page.totalElements
    }
  }

  updatePageSize(newPageSize: number) {
    console.log(newPageSize);
    
    this.pageSize = newPageSize; 
    this.pageNumber = 1; 
    this.listProducts(); 
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword'); 

    //if we have a different keyword than previous, then set pageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.pageNumber = 1; 
    }
    this.previousKeyword = theKeyword;
    console.log(`keyword = ${theKeyword}`);
  
    //searching items by keyword
    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, theKeyword).subscribe(this.processResult())
  }

  addToCart(product: Product){ 
      const theCartItem = new CartItem(product) 
      this.cartService.addToCart(theCartItem); 
  }

}
