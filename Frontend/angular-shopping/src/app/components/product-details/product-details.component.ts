import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service'; 
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //Async call, bufore handleProductDetailes() completed, Product is null (showing undefined in Developer tool in Chrome)
  product: Product = new Product(); 

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetailes(); 
    })
  }

  handleProductDetailes() {
    //get the "id" param string, and conver it to number
    const productId: number = +this.route.snapshot.paramMap.get("id"); 

    //make a call to backend to retrieve product detail
    this.productService.getProduct(productId).subscribe(
      data => {
        // console.log(data);
        this.product = data 
      }
    )
  }

  addToCart(product){
    const theCartItem = new CartItem(product) 
    this.cartService.addToCart(theCartItem); 
  }

}
