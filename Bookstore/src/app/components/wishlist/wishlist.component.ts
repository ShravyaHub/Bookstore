import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../services/httpService/http-service.service';
import {ProductServiceService} from '../../services/productService/product-service.service';
import {DataSharingService} from '../../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private httpService:HttpServiceService,
              private productservice:ProductServiceService,
              private dataService:DataSharingService) { }

              imageArray:string[] = [];
              i=0;
  datasource:any;
  data:any;

  ngOnInit(): void {
    this.displayBooks();
  }

  displayBooks() {
    this.httpService.getJSON().subscribe((data:any) => {
      data.paths.forEach((element:any) => {
        this.imageArray.push(element.path);
      });
    });
        this.productservice.getWishlistItems().subscribe((response:any) => {
          this.i=0;
          console.log(response);
          this.datasource = response.result;
            response.result.forEach((ele:any) => {
              ele.product_id.bookImage=(ele.product_id.bookImage === null) ? this.imageArray[this.i]: ele.product_id.bookImage;
              this.i++;
            });
         
        this.data=response.result;
      });
      }

      remove(item:any, id:any) {
        console.log(id);
        this.productservice.removeFromWishlist(item, id).subscribe((response:any) => {
          console.log(response);
          this.displayBooks();
          this.dataService.changeMessage("Cart updated");
        });
      }

    }
  
