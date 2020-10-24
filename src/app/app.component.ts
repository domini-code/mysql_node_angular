import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '@shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false;

  private destroy$ = new Subject<any>();
  
  constructor(private utilsSvc: UtilsService, private router: Router) {}

  closeMenu(): void{
    this.utilsSvc.openSidebar(false);
    this.router.navigate(['/home']);
  }


  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

 

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
