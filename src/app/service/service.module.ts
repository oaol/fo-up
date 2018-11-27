import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionService } from './permission/permission.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
  ],
  providers: [
    PermissionService,
    UserService
  ]
})
export class ServiceModule { }

export {PermissionService};
export {UserService};
