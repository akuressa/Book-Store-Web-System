import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { confirmPasswordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  isSubmitted = false;
  signupForm: FormGroup = new FormGroup({});
  public validationErrors: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      userType: ['visitor'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      }, { validator: confirmPasswordValidator });
  }

  public getValidationErrorsKeys(): string[] {
    if (this.validationErrors) {
      return Object.keys(this.validationErrors);
    }
    return [];
  }

  onSubmit() {
    this.isSubmitted = true;
    const user = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      userType: this.signupForm.value.userType,
      password: this.signupForm.value.password,

    }
    if (this.signupForm.valid) {
      this.authService.register(user)
      .subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          this.validationErrors = error.error.data
        }
      );
    }
  }

}
