import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginError;

  constructor(private formBuilder: FormBuilder,
              private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get loginFormControls() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    if (this.loginFormControls.username.value === 'navtech123'  && this.loginFormControls.password.value === 'navtech123' ){
      this.loginError = false;
      this.router.navigate([this.loginFormControls.username.value + '/orders'])
    }else{
      this.loading = false;
      this.loginError = true;
    }
}
}
