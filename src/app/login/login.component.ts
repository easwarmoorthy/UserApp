import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: boolean;

  constructor(private http: HttpClient, private route: Router) { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return;
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginForm);
  }

  loginUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
};
    return this.http.post<any>("http://localhost:3000/login", user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  submit() {
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {

      this.loginUser(this.loginForm.value)
        .subscribe(user => {
          console.log(user);
          if (user.auth) {
            console.log("save token");
            localStorage.setItem("token", user.token);
            this.route.navigate(["/users"]);
          }
          else {
            this.loginError = !user.auth;
          }
        });
    } else {
      let controls = Object.keys(this.loginForm.controls);
      for(let i=0; i< controls.length; ++i){
        this.loginForm.controls[controls[i]].markAsTouched();
      }
    }
  }

}
