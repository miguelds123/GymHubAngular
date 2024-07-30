import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioAllComponent } from './horario-all/horario-all.component';
import { HorarioIndexComponent } from './horario-index/horario-index.component';
import { HorarioDetailComponent } from './horario-detail/horario-detail.component';
import { BloqueoDetailComponent } from './bloqueo-detail/bloqueo-detail.component';
import { HorarioFormComponent } from './horario-form/horario-form.component';

const routes: Routes = [
  { path:'horarios/create', component: HorarioFormComponent},
  { path: "horariostable", component:HorarioAllComponent},
  { path: 'horarios', component: HorarioIndexComponent },
  { path: 'horarios/:id', component: HorarioDetailComponent },
  { path: 'bloqueos/:id', component: BloqueoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }
