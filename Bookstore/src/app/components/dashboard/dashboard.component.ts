import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/productService/product-service.service';
import { DataSharingService } from '../../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  amount: any;
  wishlistAmount: any;
  message: any;
  subscription:any;

  constructor(private productService: ProductServiceService,
              private data: DataSharingService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe((message:any) => {
      console.log(message);
      this.getCartItems();
      this.getWishlistItems();
      });
  }

  getCartItems() {
    this.productService.getCartItems().subscribe((response:any) => {
      this.amount=response.result.length;
      console.log(response.result.length);
        });
  }

  getWishlistItems() {
    this.productService.getWishlistItems().subscribe((response:any) => {
      this.wishlistAmount=response.result.length;
      console.log(response.result.length);
        });
  }



}
