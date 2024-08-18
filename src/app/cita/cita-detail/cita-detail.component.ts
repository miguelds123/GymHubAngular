import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-cita-detail',
  templateUrl: './cita-detail.component.html',
  styleUrls: ['./cita-detail.component.css'],
})
export class CitaDetailComponent implements OnInit, OnDestroy {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.obtenerCita(Number(id));
    }
  }

  obtenerCita(id: number) {
    this.gService
      .get('cita', id) // Ajusta la ruta según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datos = data;
        },
        (error) => {
          console.error('Error obteniendo cita:', error);
          // Manejar el error apropiadamente en tu aplicación (por ejemplo, redireccionar a una página de error)
        }
      );
  }

  getColorByEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'yellow';
      case 'CONFIRMADA':
        return 'green';
      case 'CANCELADA':
        return 'red';
      default:
        return 'gray';
    }
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
