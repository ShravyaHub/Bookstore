import { Injectable } from '@angular/core';
import {HttpServiceService} from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpServiceService) { }

  getBooks() { return this.http.get('/bookstore_user/get/book'); }

  getCartItems() { return this.http.get('/bookstore_user/get_cart_items'); }

  addToCart(data:any, id:any) { return this.http.post('/bookstore_user/add_cart_item/' + id, data)}

}
