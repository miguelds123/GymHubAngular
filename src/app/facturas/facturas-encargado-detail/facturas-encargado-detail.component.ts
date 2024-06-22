import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facturas-encargado-detail',
  templateUrl: './facturas-encargado-detail.component.html',
  styleUrl: './facturas-encargado-detail.component.css'
})
export class FacturaDetailComponent {
  datos: any;
  datosCombinados: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['type', 'name', 'quantity', 'price', 'total'];
  constructor(private gService: GenericService,
    private route:ActivatedRoute
  ) {
    let id=this.route.snapshot.paramMap.get('id')
    if(!isNaN(Number(id))) 
      this.obtenerFactura(Number(id))
  }
  obtenerFactura(id: any) {
    this.gService
      .get('factura', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.datosCombinados = [
          ...this.datos.productos.map(item => ({
            tipo: 'Producto',
            nombre: item.producto.nombre,
            cantidad: item.cantidad,
            subtotal: item.subtotal
          })),
          ...this.datos.servicios.map(item => ({
            tipo: 'Servicio',
            nombre: item.servicio.nombre,
            cantidad: item.cantidad,
            subtotal: item.subtotal
          }))
        ];
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
