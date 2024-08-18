import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';

@Component({
  selector: 'app-cita-all',
  templateUrl: './cita-all.component.html',
  styleUrls: ['./cita-all.component.css']
})
export class CitaAllComponent implements OnInit, OnDestroy {
  datos: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  filtroCliente: string = '';
  filtroFecha: Date | null = null;
  filterDatos: any[] = [];
  encargadoId: number = 1;
  constructor(
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService,
  ) {}

  ngOnInit(): void {
    this.listCitas();
  }
  listCitas() {
    this.gService.get('cita/encargado/citas',this.encargadoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (respuesta: any[]) => {
          console.log(respuesta); // Verifica que los datos sean correctos
          this.datos = respuesta;
          this.filterDatos = [...this.datos];
        },
        error => {
          console.error('Error obteniendo citas:', error);
        }
      );
}

  detalle(id: number) {
    if (id) {
      this.router.navigate(['/cita', id]);
    } else {
      console.error('ID no definido');
    }
  }

  buscarCitas() {
    this.filterDatos = this.datos.filter(cita => 
      (this.filtroCliente ? 
        cita.cliente.toLowerCase().includes(this.filtroCliente.toLowerCase()) 
        : true) &&
      (this.filtroFecha ? new Date(cita.fecha).toDateString() === new Date(this.filtroFecha).toDateString() : true)
    );
  }

 
  getColorByEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return '#ffeb3b'; /* Amarillo */
      case 'CONFIRMADA': return '#4caf50'; /* Verde */
      case 'CANCELADA': return '#f44336'; /* Rojo */
      case 'REPROGRAMADA': return '#fff'; /* Blanco */
      case 'COMPLETADA': return '#9e9e9e'; /* Gris */
      default: return '#000'; /* Negro por defecto */
    }
  }
  
  crearCita() {
    this.router.navigate(['/cita-create']);
  }
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'estado-pendiente';
      case 'CONFIRMADA': return 'estado-confirmada';
      case 'CANCELADA': return 'estado-cancelada';
      case 'REPROGRAMADA': return 'estado-reprogramada';
      case 'COMPLETADA': return 'estado-completada';
      default: return '';
    }
  }
  
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
