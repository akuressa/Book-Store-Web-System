import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = ""
  loginForm: FormGroup = new FormGroup({});
  constructor ( private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userType: ['visitor'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const user = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password,
      userType : this.loginForm.value.userType
    }

    this.authService.login(user)
      .subscribe(
        response => {
          this.authService.setToken(response.user.access_token)
          this.authService.loggedinStatus(user.userType)
          if (user.userType == 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (user.userType == 'author'){
            this.authService.setAuthorId(response.user.id)
            this.router.navigate(['/book-list']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.error = error.error.msg;
        }
      );
    }
  }
