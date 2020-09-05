import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form.service'; 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup; 

  totalPrice: number = 0;
  totalQuantity: number = 0; 

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  
  constructor(private formBuilder: FormBuilder, private formService: FormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''], //[''] means value default as empty
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth: [''],
        expirationYear:[''], 
      }),  
    })

    // populate the credit card months
    const startMonth: number = new Date().getMonth() + 1; 
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.creditCardMonths = data; 
      }
    );

    //populate the credit card years  
    this.formService.getCreditCardYears().subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.creditCardYears = data; 
      }
    );
  }

  onSubmit(){
    // console.log(this.checkoutFormGroup.get('customer').value);
  }


  copyShippingToBillingAddress(event){    
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
          .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear(); 
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
    console.log(selectedYear);
    

    let startMonth: number; 

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1; 
    } else {
      startMonth = 1; 
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data; 
      }
    )
  }

}
