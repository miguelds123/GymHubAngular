import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioIndexComponent } from './servicio-index/servicio-index.component';

const routes: Routes = [
  {path: "servicios", component: ServicioIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
