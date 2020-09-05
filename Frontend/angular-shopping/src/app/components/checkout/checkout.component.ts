import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form.service'; 
import { Country } from 'src/app/common/country'; 
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup; //import from angular form

  totalPrice: number = 0;
  totalQuantity: number = 0; 

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = []; 
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  
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

    //populate the countries 
    this.formService.getCountries().subscribe(
      data => this.countries = data
    )
  }

  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer').value);

    //formGroupName is defined in each div like this <div formGroupName="customer">, country, state and email are defined as formControlName
    console.log("The email is " + this.checkoutFormGroup.get('customer').value.email);
    console.log("The shipping address contry " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  }


  copyShippingAddressToBillingAddress(event){    
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
          .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      //bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      //bug fix for states 
      this.billingAddressStates = []; 
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

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName); 
    // console.log(formGroup);

    //retrieve the value by putting [ngValue]="country" in html
    const countryCode = formGroup.value.country.code;
    // const countryName = formGroup.value.country.name;
    // console.log(countryCode);
    // console.log(countryName);

    this.formService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data; 
        } else {
          this.billingAddressStates = data; 
        }

        //select first state as default 
        formGroup.get('state').setValue(data[0]); 
      }
    )
  }

}
