import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { SucursalIndexComponent } from './sucursal-index/sucursal-index.component';
import { SucursalAllComponent } from './sucursal-all/sucursal-all.component';
import { SucursalDetailComponent } from './sucursal-detail/sucursal-detail.component';

const routes: Routes = [
  {path:'sucursales/create', component:SucursalFormComponent},
  {path:'sucursales/update/:id', component: SucursalFormComponent},
  { path: 'sucursales', component: SucursalIndexComponent },
  { path: 'sucursalestable', component: SucursalAllComponent },
  { path: 'sucursales/:id', component: SucursalDetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }
