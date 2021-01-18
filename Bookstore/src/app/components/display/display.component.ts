import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ProductServiceService} from '../../services/productService/product-service.service'
import {HttpServiceService} from '../../services/httpService/http-service.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private productservice:ProductServiceService, 
              private httpService: HttpServiceService) { }

  data:any;
  selectedSort:any;
  @ViewChild('myDropDownList') myDropDownList!: ElementRef;
  selectedValue:any;
  bookImages=""
  imageArray:string[] = [];
  i=0;

  ngOnInit(): void {
    
    this.displayBooks();
  }


 
  displayBooks() {
    this.httpService.getJSON().subscribe((data:any) => {
      data.paths.forEach((element:any) => {
        console.log(element.path);
        this.imageArray.push(element.path);
      });
    });
        this.productservice.getBooks().subscribe((response:any) => {
          this.i=0;
            response.result.forEach((ele:any) => {
              console.log(ele);
              ele.bookImage=(ele.bookImage === null) ? this.imageArray[this.i]: ele.bookImage;
              console.log("Ele", ele);
              console.log("elem", ele.bookImage);
              this.i++;
            });
         
        this.data=response.result;
        console.log(response);
      });
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
