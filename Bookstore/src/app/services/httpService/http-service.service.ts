import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  [x:string]:any;
  baseURL=environment.baseURL;
  token:any;

  constructor(private http: HttpClient) {}

  get(url:any) {
    this.token=localStorage.getItem('token');
    let options={
      headers:new HttpHeaders({
        'Authorization':this.token,
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
    return this.http.get(this.baseURL + url, options);
  } 

  userPost(url:string, data:any) { return this.http.post(this.baseURL + url, data); }

  post(url: string, data: any) {
    let options={
      headers:new HttpHeaders({
        'Name':this.token,
        'Content-Type':'application/json'
      })
    }
    console.log(data);
    return this.http.post(this.baseURL + url, data, options);
  }

  public getJSON() {
    return this.http.get("../../../assets/imagePath.json");
}

  encode(data:any) {
    const formBody=[];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  encodedPost(url:any, data:any) {
    console.log(data);
    this.token=localStorage.getItem("token");
    let options={
      headers:new HttpHeaders({
        'Authorization':this.token,
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
    return this.http.post(this.baseURL + url, this.encode(data), options)
  }
}
