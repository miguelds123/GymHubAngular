import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component'; // Ajusta el nombre del componente según tu estructura
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css'],
})
export class ProductoAllComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre', 'precio', 'acciones'];
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private dialog: MatDialog, private router: Router, private route:ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.listProductos();
  }

  listProductos() {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.datos = respuesta;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  crearProducto() {
    this.router.navigate(['/productos/create'], {
      relativeTo: this.route,
    });
  }
  actualizarProducto(id: number) {
    this.router.navigate(['/productos/update', id], {
      relativeTo: this.route,
    });
  }
  detalleProducto(id: number) {
    this.router.navigate(['/productos', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
