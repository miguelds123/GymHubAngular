import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
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
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ServicioIndexComponent } from './servicio-index/servicio-index.component';
import { ServicioDetailComponent } from './servicio-detail/servicio-detail.component';
import { ServicioAllComponent } from './servicio-all/servicio-all.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';


@NgModule({
  declarations: [
    ServicioIndexComponent,
    ServicioDetailComponent,
    ServicioAllComponent,
    ServicioFormComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    CommonModule,
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
export class ServicioModule { }
