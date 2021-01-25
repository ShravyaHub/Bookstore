import { Injectable } from '@angular/core';
import { HttpServiceService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService: HttpServiceService) {}

  registerUser(data:any) { return this.httpService.userPost("/bookstore_user/registration", data); }

  loginUser(data:any) { return this.httpService.userPost("/bookstore_user/login", data); }

  customerDetails(data:any) { return this.httpService.put("/bookstore_user/edit_user", data); }
}
