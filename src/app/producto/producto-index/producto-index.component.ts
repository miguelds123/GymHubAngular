import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service'; // Asegúrate de importar tu servicio correcto aquí
import { CartService } from '../../share/cart.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit, OnDestroy {
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
    this.listProductos();
  }

  listProductos() {
    this.gService.list('producto/') // Ajusta la URL según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (respuesta: any[]) => {
          console.log(respuesta);
          this.datos = respuesta; // Asignación de la respuesta del API a datos
          this.filterDatos = [...this.datos]; // Clonar datos a filterDatos inicialmente
        },
        error => {
          console.error('Error obteniendo productos:', error);
          // Aquí puedes manejar el error de manera apropiada (por ejemplo, mostrar un mensaje al usuario)
        }
      );
  }

  detalle(id: number) {
    this.router.navigate(['/productos', id]); // Navegación a la vista de detalle de producto
  }

  buscarProductos() {
    if (!this.filtro) {
      this.filterDatos = [...this.datos]; // Mostrar todos los productos si no hay filtro aplicado
    } else {
      this.filterDatos = this.datos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      ); // Filtrar productos por nombre según el filtro ingresado
    }
  }

  comprar(id:number){
    this.gService.get("producto/",id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      //Agregarlo a la compra
      this.cartService.addToCart(respuesta)
      this.noti.mensaje(
        'Orden',
        'Producto '+respuesta.nombre+' agregado a la orden',
        TipoMessage.success
      )
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
