import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from "./must-match.validator";
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserServiceService} from '../../services/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
    submitted=false;

    constructor(private formBuilder: FormBuilder,
                private snackBar:MatSnackBar,
                private userService:UserServiceService,
                private route:Router) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    get f() { return this.registerForm.controls; }

    signUp=(signUpFormValue: { firstName:any; email:any; phoneNumber:any; password:any; })=> {
        this.submitted=true;
    
        if (this.registerForm.invalid) return;
    
        let newUser={
          fullName: signUpFormValue.firstName,
          email: signUpFormValue.email,
          phone: signUpFormValue.phoneNumber,
          password: signUpFormValue.password,
          service: 'advance'
        }
    
        this.userService.registerUser(newUser).subscribe((response:any) => {
            console.log(response);
          this.snackBar.open("Sign up");
          this.route.navigate(['/signIn']);
        });
      }

}
