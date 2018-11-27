import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ListComponent } from './list/user-list.component';
import { CreateComponent } from './create/user-create.component';
import { UpdateComponent } from './update/user-update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'template',
    pathMatch: 'full'
  },
  {
    path: 'template', component: UserComponent, children: [
      {path: '', redirectTo: 'page', pathMatch: 'full'},
      {path: 'page', component: ListComponent},
      {path: 'create', component: CreateComponent},
      {path: 'update/:id', component: UpdateComponent},
    ]
  },
  {
    path: '**',
    component: UserComponent
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
