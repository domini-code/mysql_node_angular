import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
