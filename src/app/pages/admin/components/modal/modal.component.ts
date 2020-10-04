import { UsersService } from './../../services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormUser } from '@shared/utils/base-form-user';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsersService
  ) {}

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password').setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.pathFormData();
    }
  }

  onSave(): void {
    const formValue = this.userForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.userSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
      });
    } else {
      const userId = this.data?.user?.id;
      this.userSvc.update(userId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    });
  }
}
