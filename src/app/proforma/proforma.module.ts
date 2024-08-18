import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProformaRoutingModule } from './proforma-routing.module';
import { ProformaAllComponent } from './proforma-all/proforma-all.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {MatBadgeModule} from '@angular/material/badge'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProformaDetailComponent } from './proforma-detail/proforma-detail.component';


@NgModule({
  declarations: [
    ProformaAllComponent,
    ProformaDetailComponent
  ],
  imports: [
    CommonModule,
    ProformaRoutingModule,
    CommonModule,
    MatGridListModule,
    BrowserAnimationsModule,
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class ProformaModule { }
