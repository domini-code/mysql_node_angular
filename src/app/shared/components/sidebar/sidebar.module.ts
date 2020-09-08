import { UtilsService } from './../../services/utils.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SidebarComponent],
  providers: [UtilsService],
})
export class SidebarModule {}
