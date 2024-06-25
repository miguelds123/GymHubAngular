import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnDestroy {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.obtenerProducto(Number(id));
    }
  }

  obtenerProducto(id: number) {
    this.gService
      .get('producto',id) // Ajusta la ruta según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datos = data;
        },
        (error) => {
          console.error('Error obteniendo producto:', error);
          // Manejar el error apropiadamente en tu aplicación (por ejemplo, redireccionar a una página de error)
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
