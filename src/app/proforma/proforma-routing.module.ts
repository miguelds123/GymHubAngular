import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProformaAllComponent } from './proforma-all/proforma-all.component';
import { ProformaDetailComponent } from './proforma-detail/proforma-detail.component';

const routes: Routes = [
  {
    path: 'proforma',
    component: ProformaAllComponent
  },
  {
    path: 'proforma/:id',
    component: ProformaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
