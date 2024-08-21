import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
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
import { UserAllComponent } from './user-all/user-all.component';
import { UserDiagComponent } from './user-diag/user-diag.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    
    UserAllComponent,
    UserDiagComponent,
    UserIndexComponent,
    UserCreateComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatTabsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
