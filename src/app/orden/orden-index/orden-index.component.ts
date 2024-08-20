import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../../share/cart.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-orden-index',
  templateUrl: './orden-index.component.html',
  styleUrl: './orden-index.component.css'
})
export class OrdenIndexComponent implements OnInit {
  total = 0;
  fecha = Date.now();
  fechaHoy = new Date()
  qtyItems = 0;
  clienteControl = new FormControl();
  clientes: any[] = [];    // Este array debe llenarse con los datos de los clientes desde tu API
  encargado: any 
  filteredClientes: Observable<any[]>; 
  selectedCliente: any = null;
  //Tabla
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    "impuesto",
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router
  ) {
    this.filteredClientes = this.clienteControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filterClientes(nombre) : this.clientes.slice()))
    );
  }

  ngOnInit(): void {
    // Obtener todos los items de la Compra
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.cartService.getTotal.subscribe((valor) => {
      console.log(valor)
      this.total = valor;
      console.log(this.total)
    });

    // Cargar los clientes desde el API
    this.gService.list('usuario/cliente/usuario').subscribe((data: any[]) => {
      this.clientes = data;
    });

    // Obtener el encargado
    this.gService.get("usuario", 1).subscribe((data: any) => {
      this.encargado = data;
      console.log(this.encargado);
    });

    // Verificar si hay un proformaId en el carrito
    const proformaId = this.cartService.getProformaId();
    if (proformaId !== null) {
      this.gService.get('proforma/detail', proformaId).subscribe((proformaData: any) => {
        // Asumimos que el cliente está en un campo llamado 'cliente' en el objeto proforma
        const cliente = proformaData.cliente;
        if (cliente) {
          this.selectedCliente = cliente;
          this.clienteControl.setValue(cliente); // Mostrar el cliente en el control
        }
      });
    }
  }

  private _filterClientes(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.clientes.filter(cliente => cliente.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(cliente: any): string {
    return cliente && cliente.nombre ? cliente.nombre : '';
  }

  onClienteSelected(event: any) {
    this.selectedCliente = event.option.value;
    console.log(this.selectedCliente.id);
    const proformaId = this.cartService.getProformaId();
    if (proformaId !== null) {
      this.cartService.deleteCart();
    }
  }

  actualizarCantidad(item: any) {
    let cartItems = this.cartService.getItems;

    // Encontrar el índice del ítem que se está actualizando
    let index = cartItems.findIndex(cartItem => cartItem.idItem === item.idItem && cartItem.product === item.product);

    if (index !== -1) {
      if (item.cantidad <= 0) {
        // Si la cantidad es 0 o menor, eliminar el ítem
        this.eliminarItem(item);
      } else {
        // Si la cantidad es mayor a 0, actualizar la cantidad y recalcular subtotal e impuesto
        cartItems[index].cantidad = item.cantidad;
        cartItems[index].subtotal = this.cartService.calculoSubtotal(cartItems[index]);
        cartItems[index].impuesto = this.cartService.calculoImpuesto(cartItems[index]);
        this.cartService.updateCart(cartItems);
      }
    }
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
  }

  registrarOrden() {
    if (this.selectedCliente != null) {
      if (this.cartService.getItems != null && this.cartService.getItems.length > 0) {
        let itemCompra = this.cartService.getItems;
        let proformaId = this.cartService.getProformaId(); // Obtener el proformaId

        // Separar productos y servicios
        let productos = itemCompra.filter(item => item.product.hasOwnProperty('categoria'));
        let servicios = itemCompra.filter(item => item.product.hasOwnProperty('tiempo'));

        // Crear detalle de productos
        let detalleProductos = productos.map(x => ({
          ['productoId']: x.idItem,
          ['cantidad']: x.cantidad,
          ["subtotal"]: x.precio * x.cantidad,
        }));

        // Crear detalle de servicios
        let detalleServicios = servicios.map(x => ({
          ['servicioId']: x.idItem,
          ['cantidad']: x.cantidad,
          ["subtotal"]: x.precio * x.cantidad,
        }));

        // Datos para el API
        let orden = {
          fecha: new Date(this.fecha),
          productos: detalleProductos.length > 0 ? detalleProductos : undefined,
          servicios: detalleServicios.length > 0 ? detalleServicios : undefined,
          clienteId: this.selectedCliente.id,
          total: this.total,
          estado: true,
          proformaId: proformaId !== null ? proformaId : undefined,  // Incluir proformaId si está disponible
        };

        // Guardar Orden
        this.gService.create('factura', orden).subscribe((respuesta) => {
          this.noti.mensaje('Factura', 'Factura creada #' + respuesta.id, TipoMessage.success);
          this.cartService.deleteCart();
        });
      } else {
        this.noti.mensaje('Orden', 'Agregue productos o servicios a la orden', TipoMessage.warning);
      }
    } else {
      this.noti.mensaje("Error", "Debe seleccionar el cliente que va realizar la compra", TipoMessage.error);
    }
  }
}
