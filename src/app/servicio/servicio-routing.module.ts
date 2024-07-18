import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioIndexComponent } from './servicio-index/servicio-index.component';
import { ServicioDetailComponent } from './servicio-detail/servicio-detail.component';
import { ServicioAllComponent } from './servicio-all/servicio-all.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';

const routes: Routes = [
  {path:'servicios/create', component: ServicioFormComponent},
  {path:'servicios/update/:id', component: ServicioFormComponent},
  {path: "servicios", component: ServicioIndexComponent},
  { path: 'servicios/:id', component: ServicioDetailComponent },
  { path: "serviciostable", component:ServicioAllComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
