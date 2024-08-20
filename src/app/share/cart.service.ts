// cart.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class ItemCart {
  idItem: number;
  product: any;
  cantidad: number;
  precio: number;
  subtotal: number;
  tipo: string;
  impuesto: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<ItemCart[]>([]);
  private proformaId: number | null = null;
  public currentDataCart$ = this.cart.asObservable();
  public qtyItems = new Subject<number>();
  public total = new Subject<number>();

  constructor() {
    const savedCart = JSON.parse(localStorage.getItem('orden'));
    if (savedCart) {
      this.cart.next(savedCart.items || []);
      this.proformaId = savedCart.proformaId || null;
      this.total.next(this.calculoTotal()); // Actualiza el total después de cargar el carrito
    }
    this.currentDataCart$ = this.cart.asObservable();
  }

  saveCart(): void {
    localStorage.setItem('orden', JSON.stringify({ items: this.cart.getValue(), proformaId: this.proformaId }));
  }

  addToCart(producto: any) {
    const newItem = new ItemCart();
    let tipo: string;

    if (producto.hasOwnProperty('precio') && producto.hasOwnProperty('categoria')) {
      tipo = 'Producto';
      newItem.precio = producto.precio;
    } else if (producto.hasOwnProperty('tarifa') && producto.hasOwnProperty('tiempo')) {
      tipo = 'Servicio';
      newItem.precio = producto.tarifa;
    }

    newItem.idItem = producto.id || producto.idItem;
    newItem.cantidad = 1;
    newItem.subtotal = this.calculoSubtotal(newItem);
    newItem.impuesto = this.calculoImpuesto(newItem);
    newItem.product = producto;
    newItem.tipo = tipo;

    let listCart = this.cart.getValue();
    if (listCart) {
      let objIndex = listCart.findIndex((obj) => obj.idItem == newItem.idItem && obj.tipo === newItem.tipo);
      if (objIndex != -1) {
        if (producto.hasOwnProperty('cantidad')) {
          if (producto.cantidad <= 0) {
            this.removeFromCart(newItem);
            return;
          } else {
            listCart[objIndex].cantidad = producto.cantidad;
          }
        } else {
          listCart[objIndex].cantidad += 1;
        }
        newItem.cantidad = listCart[objIndex].cantidad;
        listCart[objIndex].subtotal = this.calculoSubtotal(newItem);
      } else {
        listCart.push(newItem);
      }
    } else {
      listCart = [];
      listCart.push(newItem);
    }
    this.cart.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.total.next(this.calculoTotal());
    this.saveCart();
  }

  setProformaId(id: number) {
    this.proformaId = id;
    this.saveCart();
  }

  getProformaId() {
    return this.proformaId;
  }

  public calculoImpuesto(item: ItemCart) {
    return (item.precio * 0.13) * item.cantidad;
  }

  public calculoSubtotal(item: ItemCart) {
    return item.precio * item.cantidad;
  }

  public removeFromCart(newData: ItemCart) {
    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj) => obj.idItem == newData.idItem && obj.tipo === newData.tipo);
    if (objIndex != -1) {
      listCart.splice(objIndex, 1);
    }
    this.cart.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.total.next(this.calculoTotal());
    this.saveCart();
  }

  updateCart(cartItems: ItemCart[]) {
    this.cart.next(cartItems);
    this.saveCart();
    this.qtyItems.next(this.quantityItems());
    this.total.next(this.calculoTotal());
  }

  get getItems() {
    return this.cart.getValue();
  }

  get countItems(): Observable<number> {
    this.qtyItems.next(this.quantityItems());
    return this.qtyItems.asObservable();
  }

  quantityItems() {
    let listCart = this.cart.getValue();
    let sum = 0;
    if (listCart != null) {
      listCart.forEach((obj) => {
        sum += obj.cantidad;
      });
    }
    return sum;
  }

  public calculoTotal(): number {
    let totalCalc = 0;
    let listCart = this.cart.getValue();
    if (listCart != null) {
      listCart.forEach((item: ItemCart) => {
        totalCalc += item.subtotal;
        totalCalc += item.impuesto;
      });
    }
    console.log('Total calculado:', totalCalc); // Verifica el total calculado
    return totalCalc;
  }

  get getTotal(): Observable<number> {
    this.total.next(this.calculoTotal());
    return this.total.asObservable();
  }

  public deleteCart() {
    // Vaciar el carrito
    this.cart.next([]);
    // Establecer proformaId a null
    this.proformaId = null;
    // Reiniciar la cantidad de artículos y el total a 0
    this.qtyItems.next(0);
    this.total.next(0);
    // Guardar los cambios en localStorage
    this.saveCart();
}
}
