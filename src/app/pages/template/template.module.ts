import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { TemplateComponent } from './template.component';
import { TemplateRoutingModule } from './template-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [TemplateComponent, ListComponent, CreateComponent, UpdateComponent]
})
export class TemplateModule { }
