import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { CartService } from '../../share/cart.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';

@Component({
  selector: 'app-servicio-index',
  templateUrl: './servicio-index.component.html',
  styleUrl: './servicio-index.component.css'
})
export class ServicioIndexComponent {
  datos: any[] = []; // Definición de datos como un array vacío de any
  destroy$: Subject<boolean> = new Subject<boolean>();
  filtro: string = '';
  filterDatos: any[] = []; // Inicialización de filterDatos como un array vacío de any

  constructor(
    private gService: GenericService, // Inyección del servicio GenericService
    private router: Router,
    private cartService: CartService,
    private noti:NotificacionService,
  ) {}

  ngOnInit(): void {
    this.listServicios();
  }

  listServicios() {
    this.gService.list('servicio/') // Ajusta la URL según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (respuesta: any[]) => {
          console.log(respuesta);
          this.datos = respuesta; // Asignación de la respuesta del API a datos
          this.filterDatos = [...this.datos]; // Clonar datos a filterDatos inicialmente
        },
        error => {
          console.error('Error obteniendo servicios:', error);
          // Aquí puedes manejar el error de manera apropiada (por ejemplo, mostrar un mensaje al usuario)
        }
      );
  }

  detalle(id: number) {
    this.router.navigate(['/servicios', id]); // Navegación a la vista de detalle de producto
  }

  comprar(id:number){
    this.gService.get("servicio/",id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      //Agregarlo a la compra
      this.cartService.addToCart(respuesta)
      this.noti.mensaje(
        'Orden',
        'Servicio '+respuesta.nombre+' agregado a la orden',
        TipoMessage.success
      )
    })
  }

  buscarServicios() {
    if (!this.filtro) {
      this.filterDatos = [...this.datos]; // Mostrar todos los productos si no hay filtro aplicado
    } else {
      this.filterDatos = this.datos.filter(servicio =>
        servicio.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      ); // Filtrar productos por nombre según el filtro ingresado
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
