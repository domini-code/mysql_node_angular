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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = null;
  isLogged: boolean;
  isMenu: boolean;
  
  private destroy$ = new Subject<any>();
  
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(
    private authSvc: AuthService, 
    private utilsSvc : UtilsService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isAdmin = user?.role;
        this.isLogged = this.isAdmin?true : false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.router.navigate(['/login']);
  }
  
  onToggleSidenav(): void {
    //this.toggleSidenav.emit();

    /// Aca el boton de menu tendria que no mostrarse, y volver a mostrarse al cerrar el sidebar.
    this.utilsSvc.openSidebar(true);
    //this.isMenu = this.isMenu?false : true;
  }
  
  onLogout(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
    this.router.navigate(['/login']);
  }
}
