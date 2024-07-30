import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sucursal-all',
  templateUrl: './sucursal-all.component.html',
  styleUrl: './sucursal-all.component.css'
})
export class SucursalAllComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre', 'telefono', 'direccion', 'acciones'];
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.listSucursales();
  }

  listSucursales() {
    this.gService
      .list('sucursal/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.datos = respuesta;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  crearSucursal() {
    this.router.navigate(['/sucursales/create'], {
      relativeTo: this.route,
    });
  }

  actualizarSucursal(id: number) {
    this.router.navigate(['/sucursales/update', id], {
      relativeTo: this.route,
    });
  }

  detalleSucursal(id: number) {
    this.router.navigate(['/sucursales', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
