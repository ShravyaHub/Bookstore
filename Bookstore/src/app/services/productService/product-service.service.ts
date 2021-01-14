import { Injectable } from '@angular/core';
import {HttpServiceService} from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpServiceService) { }

  getBooks() { return this.http.get('/bookstore_user/get/book'); }

}
