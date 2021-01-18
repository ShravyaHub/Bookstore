import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserServiceService} from '../../services/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
    submitted=false;

    constructor(private formBuilder: FormBuilder,
                private snackBar:MatSnackBar,
                private userService:UserServiceService,
                private route:Router) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        }, {});
    }

    get f() { return this.loginForm.controls; }


    signIn=(signInFormValue: { email:any; password:any; })=> {
      this.submitted = true;
  
      if (this.loginForm.invalid) return;
        
      let user={
        email: signInFormValue.email,
        password: signInFormValue.password,
        service: 'advance'
      }
  
      this.userService.loginUser(user).subscribe((response:any) => {
        console.log(response);
        localStorage.setItem("token", response.result.accessToken);
        this.snackBar.open("Sign in successful");
        this.route.navigate(['/dashboard/books']);
      }, () => {
        this.snackBar.open("Incorrect email or password");
      });
    }

}
