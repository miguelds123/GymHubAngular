import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { NotificacionService } from '../../share/notification.service';
import { CartService } from '../../share/cart.service';

@Component({
  selector: 'app-proforma-all',
  templateUrl: './proforma-all.component.html',
  styleUrl: './proforma-all.component.css'
})
export class ProformaAllComponent {
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
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.listCitas();
  }
  listCitas() {
    this.gService.get('proforma',this.encargadoId)
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
      this.router.navigate(['/proforma/', id]);
    } else {
      console.error('ID no definido');
    }
  }

  comprar(id: number, idProforma: number) {
    this.gService.get("servicio/", id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        respuesta.proformaId = idProforma;
        this.cartService.addToCart(respuesta);
        this.cartService.setProformaId(idProforma);  // Establecer el proformaId en el servicio
        this.router.navigate(["/orden"]);
      });
  }
  
  crearCita() {
    this.router.navigate(['/cita-create']);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
