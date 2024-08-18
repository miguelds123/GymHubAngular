// cita-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaIndexComponent } from './cita-index/cita-index.component'; // Importa el componente de index de citas
import { CitaDetailComponent } from './cita-detail/cita-detail.component';
import { CitaAllComponent } from './cita-all/cita-all.component'; // Asegúrate de que el path sea correcto
import { CitaFormComponent } from './cita-form/cita-form.component';

const routes: Routes = [
  { path: 'sucursal', component: CitaIndexComponent },
  { path: 'cita/:id', component: CitaDetailComponent },
  { path: 'citatable', component: CitaAllComponent },
  { path: 'cita-create', component: CitaFormComponent } // Ruta para el componente CitaAllComponent
  // Puedes agregar más rutas aquí según sea necesario
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitaRoutingModule { }
