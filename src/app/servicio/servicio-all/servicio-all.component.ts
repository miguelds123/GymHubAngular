import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicio-all',
  templateUrl: './servicio-all.component.html',
  styleUrl: './servicio-all.component.css'
})
export class ServicioAllComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre', 'tarifa', 'acciones'];
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private dialog: MatDialog, private router: Router, private route:ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.listServicios();
  }

  listServicios() {
    this.gService
      .list('servicio/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.datos = respuesta;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  crearServicio() {
    this.router.navigate(['/servicios/create'], {
      relativeTo: this.route,
    });
  }

  actualizarServicios(id: number) {
    this.router.navigate(['/servicios/update', id], {
      relativeTo: this.route,
    });
  }

  detalleServicios(id: number) {
    this.router.navigate(['/servicios', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
