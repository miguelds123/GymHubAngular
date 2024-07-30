import { Component } from '@angular/core';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horario-index',
  templateUrl: './horario-index.component.html',
  styleUrl: './horario-index.component.css',
})
export class HorarioIndexComponent {
  datos: any[] = []; // Definición de datos como un array vacío de any
  destroy$: Subject<boolean> = new Subject<boolean>();
  filtro: Date;
  filterDatos: any[] = []; // Inicialización de filterDatos como un array vacío de any
  sucursales: any[] = [];
  selectedSucursal: any = null;

  constructor(
    private gService: GenericService, // Inyección del servicio GenericService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listSucursales();
  }

  listHorarios() {
    forkJoin({
      horarios: this.gService.get('horario/', this.selectedSucursal.id),
      bloqueos: this.gService.get('bloqueo/', this.selectedSucursal.id),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ horarios, bloqueos }) => {
          const horariosConTipo = horarios.map((horario) => ({
            ...horario,
            tipo: 'Horario Disponible',
          }));
          const bloqueosConTipo = bloqueos.map((bloqueo) => ({
            ...bloqueo,
            tipo: 'Horario Bloqueado',
          }));
          console.log(horarios, bloqueos);
          this.filterDatos = [...horariosConTipo, ...bloqueosConTipo]; // Asignación de la respuesta del API a datos
        },
        (error) => {
          console.error('Error obteniendo horarios:', error);
          // Aquí puedes manejar el error de manera apropiada (por ejemplo, mostrar un mensaje al usuario)
        }
      );
  }

  listSucursales() {
    this.gService
      .list('sucursal/') // Ajusta la URL según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (respuesta: any[]) => {
          console.log(respuesta);
          this.sucursales = respuesta;
        },
        (error) => {
          console.error('Error obteniendo sucursales:', error);
        }
      );
  }

  detalle(id: number, tipo: string) {
    console.log(tipo)
    if (tipo === "Horario Disponible"){
      this.router.navigate(['/horarios', id]); // Navegación a la vista de detalle de producto
    }
    if (tipo === "Horario Bloqueado"){
      this.router.navigate(['/bloqueos', id]); // Navegación a la vista de detalle de producto
    }
  }

  buscarHorarios() {
    if (!this.filtro) {
      this.filterDatos = [...this.datos]; // Mostrar todos los productos si no hay filtro aplicado
    } else {
      this.filterDatos = this.datos.filter((horario) =>
        horario.fecha.includes(this.filtro)
      ); // Filtrar productos por nombre según el filtro ingresado
    }
    this.listHorarios();
  }

  filtrarPorSucursal() {
    if (this.selectedSucursal) {
      this.filterDatos = this.datos.filter(
        (horario) => horario.sucursal.id === this.selectedSucursal.id
      );
    } else {
      this.filterDatos = [...this.datos];
    }
    this.listHorarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getColor(estado: string): string {
    switch (estado) {
      case 'Horario Disponible':
        return '#4CAF50'; // Amarillo para estado PENDIENTE
      case 'Horario Bloqueado':
        return '#E57373'; // Verde para estado CONFIRMADA
      default:
        return ''; // En caso de estado desconocido, no se aplica ningún color
    }
  }
}
