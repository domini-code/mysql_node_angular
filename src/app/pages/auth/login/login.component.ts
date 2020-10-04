import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public loginForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    this.loginForm.baseForm.get('role').setValidators(null);
    this.loginForm.baseForm.get('role').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
}
