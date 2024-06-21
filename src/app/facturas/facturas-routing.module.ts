import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasEncargadoIndexComponent } from './facturas-encargado-index/facturas-encargado-index.component';
import { FacturaDetailComponent } from './facturas-encargado-detail/facturas-encargado-detail.component';

const routes: Routes = [
  {path:"facturaAdministrador/:id", component: FacturasEncargadoIndexComponent},
  {path:"factura/:id", component:FacturaDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
