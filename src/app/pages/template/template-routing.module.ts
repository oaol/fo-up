import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './template.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'template',
    pathMatch: 'full'
  },
  {
    path: 'template', component: TemplateComponent, children: [
      {path: '', redirectTo: 'page', pathMatch: 'full'},
      {path: 'page', component: ListComponent},
      {path: 'create', component: CreateComponent},
      {path: 'update/:permissionId', component: UpdateComponent},
    ]
  },
  {
    path: '**',
    component: TemplateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class TemplateRoutingModule { }
