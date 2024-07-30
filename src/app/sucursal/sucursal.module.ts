import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalRoutingModule } from './sucursal-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge'; 
import { SucursalIndexComponent } from './sucursal-index/sucursal-index.component';
import { SucursalDetailComponent } from './sucursal-detail/sucursal-detail.component';
import { SucursalAllComponent } from './sucursal-all/sucursal-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';

@NgModule({
  declarations: [
    SucursalIndexComponent,
    SucursalDetailComponent,
    SucursalAllComponent,
    SucursalFormComponent
  ],
  imports: [
    CommonModule,
    SucursalRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SucursalModule { }
