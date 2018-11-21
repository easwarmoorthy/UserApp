import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient ) { }

  isLoggedIn(){
    console.log(localStorage.getItem("token"));
    return !!localStorage.getItem("token");
  }

  getToken(){
    return localStorage.getItem("token");
  }

}
