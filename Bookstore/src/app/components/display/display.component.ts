import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ProductServiceService} from '../../services/productService/product-service.service'
import {HttpServiceService} from '../../services/httpService/http-service.service';
import { DataSharingService } from '../../services/dataSharing/data-sharing.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private productservice:ProductServiceService, 
              private httpService: HttpServiceService,
              private dataService: DataSharingService) { }

  data:any;
  selectedSort:any;
  @ViewChild('myDropDownList') myDropDownList!: ElementRef;
  selectedValue:any;
  bookImages=""
  imageArray:string[] = [];
  i=0;
  message: any;
  subscription:any;
  clicked=false;
  wishlisted=false;
  p: number = 1;
    // collection: any[] = someArrayOfThings;  

  ngOnInit(): void {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    this.displayBooks();


  }
//   items:any[] = [];
//   pageOfItems!: Array<any>;

//   onChangePage(pageOfItems: Array<any>) {
//     this.pageOfItems = pageOfItems;
// }

pageEvent!: PageEvent;
datasource: null;
pageIndex!:number;
pageSize!:number;
length!:number;

public getServerData(event?:PageEvent){
  console.log("eveent", event)
  this.productservice.getBooks().subscribe((response:any) =>{
    console.log(response);
        this.datasource = response.result;
        // this.pageIndex = response.pageIndex;
        this.pageSize = 5;
        this.length = response.result.length;
      
    },
    error =>{
      // handle error
    }
  );
  return event;
}

 
  displayBooks() {
    this.httpService.getJSON().subscribe((data:any) => {
      data.paths.forEach((element:any) => {
        this.imageArray.push(element.path);
      });
    });
        this.productservice.getBooks().subscribe((response:any) => {
          this.i=0;
          this.datasource = response.result;
            response.result.forEach((ele:any) => {
              ele.bookImage=(ele.bookImage === null) ? this.imageArray[this.i]: ele.bookImage;
              this.i++;
            });
         
        this.data=response.result;
      });
        if(this.selectedValue === "Price: Low to high") {
        this.data.sort(function (a:any, b:any) {
          return a.price - b.price;
        });
      } else if(this.selectedValue === "Price: High to low") {
        this.data.sort(function (a:any, b:any) {
          return b.price - a.price;
        });
      }

  }

  addToCart(item:any) {
    item.addedToCart=false;
    for(let b of this.data){
      if(item.product_id==b.product_id){
        item.addedToCart=true;
      }
    }
    this.productservice.addToCart(item, item._id).subscribe((result:any)=>{
      this.clicked=false;
      console.log(result);
      this.dataService.changeMessage("Cart updated");
    })
  }

  rel() {
    this.selectedValue = this.myDropDownList.nativeElement.value;
    this.displayBooks();
  }

  addToWishlist(item:any) {
    item.addedToWishlist=false;
    for(let b of this.data){
      if(item.product_id==b.product_id){
        item.addedToWishlist=true;
      }
    }
    this.productservice.addToWishlist(item, item._id).subscribe((result:any)=>{
      this.wishlisted=false;
      console.log(result);
      this.dataService.changeMessage("Wishlist updated");
    })
  }

}
