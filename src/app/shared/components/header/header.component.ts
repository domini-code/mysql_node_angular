import { Router } from '@angular/router';
import { UtilsService } from './../../services/utils.service';
import { UserResponse } from './../../models/user.interface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Roles } from '@app/shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = null;
  isLogged;

  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(public authSvc: AuthService, private utilsSvc : UtilsService, private route: Router) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isAdmin = user?.role;
        if(this.isAdmin){
          this.isLogged = true;
        }else{
          this.isLogged = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
    this.route.navigate(['/login']);
  }
}
