import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDiagComponent } from '../user-diag/user-diag.component';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrl: './user-all.component.css'
})
export class UserAllComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre', 'sucursal', 'acciones'];
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.listEncargados();
  }

  listEncargados() {
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.datos = respuesta;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  asignarSucursal(encargado: any) {
    const dialogRef = this.dialog.open(UserDiagComponent, {
      width: '400px',
      data: { encargado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gService.updateCustom('usuario/asignar', { idEncargado: encargado.id, idSucursal: result })
          .pipe(takeUntil(this.destroy$))
          .subscribe((respuesta: any) => {
            this.listEncargados(); // Refrescar la lista
          });
      }
    });
  }

  liberarEncargado(id: number) {
    this.gService.update('usuario/liberar', { id })
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.listEncargados(); // Refrescar la lista
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
