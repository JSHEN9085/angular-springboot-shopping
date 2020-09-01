import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []; 

  totalPrice: Subject<number> = new Subject<number>(); //Subject is a subclass of Observable, it will publish events and sent to all of the subscriber

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false; 
    let existingCartItem: CartItem = undefined; 

    if(this.cartItems.length > 0){
      //if something in the cart, try to find the id
      existingCartItem = this.cartItems.find(cartItem => cartItem.id === theCartItem.id); 

      //check if we found it 
      alreadyExistsInCart = (existingCartItem != undefined); 
    }

    if(alreadyExistsInCart){
      //if already exist in cart, quantity + 1
      existingCartItem.quantity++; 
    } else {
      //if not exist in cart, add the iteam into cart
      this.cartItems.push(theCartItem); 
    }

    //compare cart total price and total quantity
    this.computeCartTotals(); 
  }

  decrementQuantity(theCartItem: CartItem){
    //decrease the quantity first
    theCartItem.quantity--; 

    //check if quantity is down to 0
    if(theCartItem.quantity == 0){
      this.remove(theCartItem)
    } else { //compute total based on new quantity
      this.computeCartTotals(); 
    }
  }

  computeCartTotals() {
    let newTotalPrice: number = 0;
    let newTotalQuantity: number = 0; 

    for(let cartItem of this.cartItems){
      newTotalPrice += cartItem.quantity * cartItem.unitPrice; 
      newTotalQuantity += cartItem.quantity; 
    }
    // next() method is used to publish new totalPrice and totalQuantity, and send new value to all subscriber
    this.totalPrice.next(newTotalPrice); 
    this.totalQuantity.next(newTotalQuantity); 

    // console.log(newTotalPrice);
    // console.log(newTotalQuantity);
  }

  remove(theCartItem: CartItem){
    //get index of the item in the array
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === theCartItem.id); 

    //if found, remove the item from array 
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1); 
      this.computeCartTotals(); 
    }
  }

}
