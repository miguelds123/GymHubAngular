import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sucursal-detail',
  templateUrl: './sucursal-detail.component.html',
  styleUrl: './sucursal-detail.component.css'
})
export class SucursalDetailComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.obtenerSucursal(Number(id));
    }
  }

  obtenerSucursal(id: number) {
    this.gService
      .get('sucursal', id) // Ajusta la ruta según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datos = data;
        },
        (error) => {
          console.error('Error obteniendo sucursal:', error);
          // Manejar el error apropiadamente en tu aplicación (por ejemplo, redireccionar a una página de error)
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
