import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { UserComponent } from './user.component';
import { TemplateRoutingModule } from './user-routing.module';
import { ListComponent } from './list/user-list.component';
import { CreateComponent } from './create/user-create.component';
import { UpdateComponent } from './update/user-update.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [UserComponent, ListComponent, CreateComponent, UpdateComponent]
})
export class UserModule { }
