import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/productService/product-service.service';
import { DataSharingService } from '../../services/dataSharing/data-sharing.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/userService/user-service.service';
import { element } from 'protractor';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  form!: FormGroup;


  constructor(private productService: ProductServiceService,
              private dataService: DataSharingService,
              private userService: UserServiceService,
              private formBuilder: FormBuilder) { 
                this.address=localStorage.getItem("address");
                this.name=localStorage.getItem("name");
                this.city=localStorage.getItem("city");
                this.landmark=localStorage.getItem("landmark");
                this.phoneNumber=localStorage.getItem("phone");
                this.pincode=localStorage.getItem("pincode");
                this.locality=localStorage.getItem("locality");
              }

  cartArray:any[] = [];
  address:any;
  name:any;
  city:any;
  landmark:any;
  phoneNumber:any;
  pincode:any;
  locality:any;

  ngOnInit(): void {
    this.getCartItems();
    console.log(this.cartArray)
    let addressType=localStorage.getItem("addresstype");
    
    console.log(this.address)
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required]],
      pincode:['',[Validators.required]],
      locality:['',[Validators.required]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      landmark:['',[Validators.required]],
      addressType:['',[Validators.required]]
   });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getCartItems() {
    this.productService.getCartItems().subscribe((response:any) => {
      this.cartArray=response.result;
      console.log(response.result.length);
        });
  }

  removeItem(item:any, id:any) {
    console.log(id);
    this.productService.removeItem(item, id).subscribe((response:any) => {
      console.log(response);
      this.getCartItems();
      this.dataService.changeMessage("Cart updated");
    });
  }

  reduce(id:any, amount:any) {
    amount--;
    let data={
      "quantityToBuy": amount
    }
    this.productService.updateQuantity(data, id).subscribe((response:any) => {
      console.log(response);
      this.getCartItems();
    })
  }

  increase(id:any, amount:any) {
    amount++;
    let data={
      "quantityToBuy": amount
    }
    this.productService.updateQuantity(data, id).subscribe((response:any) => {
      console.log(response);
      this.getCartItems();
    })
  }

  submit = (form: { name: any; phoneNumber:any; pincode:any; locality:any; address:any; city:any; landmark:any; addressType:any;}) => {
    try {
      let newUser = {
        addressType: form.addressType,
        fullAddress: form.address,
        city:form.city,
        state: form.city,
        }
        console.log(newUser);
        this.userService.customerDetails(newUser).subscribe((response)=>{
          localStorage.setItem("addresstype", form.addressType);
          localStorage.setItem("address", form.address);
          localStorage.setItem("city", form.city);
          localStorage.setItem("name", form.name);
          localStorage.setItem("phone", form.phoneNumber);
          localStorage.setItem("pincode", form.pincode);
          localStorage.setItem("locality", form.locality);
          localStorage.setItem("landmark", form.landmark);
        })
    } catch (error) {
      console.log(error);

    }
  } 

  checkout() {
    this.cartArray.forEach((element:any) => {
      let cartData={
        product_id: element._id,
        product_name: element.product_id.bookName,
        product_quantity: element.product_id.quantityToBuy,
        product_price: element.product_id.price
      }
      this.productService.order(cartData).subscribe((response:any) => {
        console.log(response);
      })
    })
  }

}
