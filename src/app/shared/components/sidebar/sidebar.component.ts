import { Router } from '@angular/router';
import { UtilsService } from './../../services/utils.service';
import { AuthService } from '@auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

<<<<<<< HEAD
  constructor(
    private authSvc: AuthService, 
    private utilsSvc: UtilsService, 
  ) {}
=======

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService, private route : Router) {}
>>>>>>> master

  ngOnInit(): void {}

  onExit(): void {
    this.authSvc.logout();
<<<<<<< HEAD
=======
    this.utilsSvc.openSidebar(false);
    this.route.navigate(['/login']);
>>>>>>> master
  }
}
