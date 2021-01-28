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

  getCart() { return this.http.get('/bookstore_user/get_cart_items'); }

  removeItem(data:any, id:any) { return this.http.delete('/bookstore_user/remove_cart_item/' + id, data); }

  updateQuantity(data:any, id:any) { return this.http.put('/bookstore_user/cart_item_quantity/' + id, data); }

  order(data:any) { return this.http.post('/bookstore_user/add/order', data); }

  addToWishlist(data:any, id:any) { return this.http.post('/bookstore_user/add_wish_list/' + id, data)}

  getWishlistItems() { return this.http.get('/bookstore_user/get_wishlist_items'); }

  removeFromWishlist(data:any, id:any) { return this.http.delete('/bookstore_user/remove_wishlist_item/' + id, data); }

}
