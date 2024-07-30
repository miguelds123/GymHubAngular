import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAllComponent } from './user-all/user-all.component';
const routes: Routes = [

  { path: 'encargadostable', component: UserAllComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
