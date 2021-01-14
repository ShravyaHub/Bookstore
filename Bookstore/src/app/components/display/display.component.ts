import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../../services/productService/product-service.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private productservice:ProductServiceService) { }

  ngOnInit(): void {
    this.displayBooks();
  }

  displayBooks() {
    this.productservice.getBooks().subscribe((response:any) => {
      // response.data.data.forEach((element:any) => {
        console.log(response)
      // });
    })
  }

}
