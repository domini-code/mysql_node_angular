import { UtilsService } from './../../services/utils.service';
import { AuthService } from '@auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authSvc: AuthService, private utilsSvc: UtilsService) {}

  ngOnInit(): void {}

  onExit(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }
}
