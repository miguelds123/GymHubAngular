import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';

const routes: Routes = [
  {path:'productos/create', component:ProductoFormComponent},
  {path:'productos/update/:id', component: ProductoFormComponent},
  { path: 'productos', component: ProductoIndexComponent },
  { path: 'productostable', component: ProductoAllComponent },
  { path: 'productos/:id', component: ProductoDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }