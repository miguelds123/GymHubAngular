import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facturas-encargado-index',
  templateUrl: './facturas-encargado-index.component.html',
  styleUrl: './facturas-encargado-index.component.css',
})
export class FacturasEncargadoIndexComponent {
  //Respuesta del API
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filtroCliente: any = null;
  filterDatos: any[] = []; // Inicialización de filterDatos como un array vacío de any
  filtroFecha: Date | null = null; // Añadir el filtro de fecha
  clientes: any[] = [];
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (!isNaN(Number(this.id))) 
      this.listFacturas(Number(this.id));
      this.listClientes(Number(this.id));
  }
  //Listar todos los videojuegos del API
  listFacturas(id: any) {
    //localhost:3000/videojuego
    this.gService
      .get('facturaAdministrador', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.datos = respuesta;
        this.filterDatos = respuesta
      });
  }
  detalle(id: number) {
    this.router.navigate(['/factura', id]);
  }

  buscarFacturasCliente() {
    console.log(this.filtroCliente)
    if (!this.filtroCliente) {
      this.filterDatos = [...this.datos]; // Mostrar todas las facturas si no hay filtro aplicado
    } else {
      this.filterDatos = this.datos.filter(
        (factura) => factura.clienteId === this.filtroCliente
      ); // Filtrar facturas por el ID exacto del cliente según el filtro ingresado
    }

    if (this.filtroFecha) {
      const selectedDate = new Date(this.filtroFecha)
      this.filterDatos = this.filterDatos.filter((factura) => {
        const facturaDate = new Date(factura.fecha)
        return facturaDate.getUTCDate() === selectedDate.getUTCDate();
      });
    }
  }

  listClientes(id: any) {
    this.gService
      .get('usuario/usuarioFactura', id) // Ajusta la URL según tu servicio de API
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (respuesta: any[]) => {
          console.log(respuesta);
          this.clientes = respuesta;
        },
        (error) => {
          console.error('Error obteniendo sucursales:', error);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
