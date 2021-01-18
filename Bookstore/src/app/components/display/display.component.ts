import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ProductServiceService} from '../../services/productService/product-service.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private productservice:ProductServiceService) { }

  data:any;
  selectedSort:any;
  @ViewChild('myDropDownList') myDropDownList!: ElementRef;
  selectedValue:any;

  ngOnInit(): void {
    
    this.displayBooks();
  }

  displayBooks() {
    this.productservice.getBooks().subscribe((response:any) => {
      this.data=response.result;
      console.log(response);
      if(this.selectedValue === "Price: Low to high") {
      console.log("Selected");
      this.data.sort(function (a:any, b:any) {
        return a.price - b.price;
      });
    } else if(this.selectedValue === "Price: High to low") {
      console.log("Selected");
      this.data.sort(function (a:any, b:any) {
        return b.price - a.price;
      });
    }
    })
  }

  addToCart(item:any) {
    console.log(item);
    // this.productservice.getCartItems().subscribe((result:any) => {
    //   console.log(result);
    // })
    this.productservice.addToCart(item, item._id).subscribe((result:any)=>{
      console.log(result)
      // this.getCartItems();
    })
  }

  rel() {
    this.selectedValue = this.myDropDownList.nativeElement.value;
    this.displayBooks();
  }

}
