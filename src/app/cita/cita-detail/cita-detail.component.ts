import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-cita-detail',
  templateUrl: './cita-detail.component.html',
  styleUrls: ['./cita-detail.component.css'],
})
export class CitaDetailComponent implements OnDestroy {
  cita: any; // Aquí puedes definir una interfaz o tipo más específico según la estructura de tu API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private genericService: GenericService, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.obtenerCita(Number(id));
    }
  }

  obtenerCita(id: number) {
    this.genericService
      .get('cita', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.cita = data; // Asignar los datos de la cita obtenidos del servicio
        },
        (error) => {
          console.error('Error obteniendo cita:', error);
          // Manejar el error apropiadamente en tu aplicación (por ejemplo, redireccionar a una página de error)
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
