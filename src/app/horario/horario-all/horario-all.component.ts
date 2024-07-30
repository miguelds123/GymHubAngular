import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-horario-all',
  templateUrl: './horario-all.component.html',
  styleUrl: './horario-all.component.css',
})
export class HorarioAllComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = [
    'tipo',
    'sucursal',
    'diaSemana',
    'fecha',
    'horaInicio',
    'horaFin',
    'acciones',
  ];
  datos: any[] = [];
  sucursales: any[] = [];
  selectedSucursal: any = null;
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

  listHorarios() {
    const params = { sucursalId: this.selectedSucursal.id };

    forkJoin({
      horarios: this.gService.get('horario/', this.selectedSucursal.id),
      bloqueos: this.gService.get('bloqueo/', this.selectedSucursal.id),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ horarios, bloqueos }) => {
        // Añade un campo 'tipo' para distinguir entre horario y bloqueo
        const horariosConTipo = horarios.map((h) => ({
          ...h,
          tipo: 'Horario Habilitado',
        }));
        const bloqueosConTipo = bloqueos.map((b) => ({
          ...b,
          tipo: 'Horario Bloqueado',
        }));
        // Combina los datos de horarios y bloqueos
        // Combina los datos
        this.datos = [...horariosConTipo, ...bloqueosConTipo];
        // Filtra los datos por la sucursal seleccionada
        this.dataSource.data = this.datos;
        console.log(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listSucursales() {
    this.gService
      .list('sucursal/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any[]) => {
        this.sucursales = respuesta;
      });
  }

  crearServicio() {
    this.router.navigate(['/horarios/create'], {
      relativeTo: this.route,
    });
  }

  actualizarServicios(id: number) {
    this.router.navigate(['/horarios/update', id], {
      relativeTo: this.route,
    });
  }

  detalleServicios(id: number, tipo : string) {
    if (tipo == "Horario Habilitado"){
      this.router.navigate(['/horarios', id]);
    }
    else{
      this.router.navigate(['/bloqueos', id]);
    }
  }

  filtrarPorSucursal() {
    if (this.selectedSucursal) {
      this.dataSource.data = this.datos.filter(
        (horario) => horario.sucursal.id === this.selectedSucursal.id
      );
    } else {
      this.dataSource.data = this.datos;
    }
    this.listHorarios();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
