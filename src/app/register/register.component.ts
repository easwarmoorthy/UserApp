import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  duplicateEmail: any;
  successMessage: boolean;
  failureMessage: boolean;

  constructor(private http: HttpClient, private route: Router){}

  registerForm = new FormGroup({
    firstName: new FormControl("",Validators.required),
    lastName: new FormControl("",Validators.required),
    company: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl("",Validators.required),
  },{ validators:this.checkPasswordValidator});

  checkPasswordValidator(group: FormGroup) {
  let pass = group.get('password');
  let confirmPass = group.get('confirmPassword');

  console.log("pass", "confirmPass");
  console.log(pass.value, confirmPass.value);
  return pass.value === confirmPass.value ?  null : { notSame: true }  ;
}

  emailChange(email:string){

    this.http.get("http://localhost:3000/check-email", {params:{email}})
    .subscribe((response)=> {
      console.log(response);
      this.duplicateEmail = response;
    });
  }




  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {


    console.error(error);
    console.log(`${operation} failed: ${error.message}`);

    return;
  };
}

  ngOnInit() {

    this.http.get("http://localhost:3000/data")
    .subscribe((response)=> console.log(response));
  }

  onSubmit(){
    console.log(this.registerForm);
  }

  registerUser (user: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/register", user)
    .pipe(
      catchError(this.handleError('addUser', user))
    );
  }

  submit(){
    console.log(this.registerForm.value);

    if(this.registerForm.valid){
      this.registerUser(this.registerForm.value)
    .subscribe(user => {
      if(user.auth){
        this.successMessage = true;
        this.registerForm.reset();
      }else{
        this.failureMessage = true;
      }
  }
);
  }
    else{
      let controls = Object.keys(this.registerForm.controls);
      for(let i=0; i< controls.length; ++i){
        this.registerForm.controls[controls[i]].markAsTouched();
      }
    }

   }


};
