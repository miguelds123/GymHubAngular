import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { CartService } from '../../share/cart.service';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuntenticated:boolean
  currentUser:any
  qtyItems:Number=0
  constructor(private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    //Obtener valor actual de la cantidad de items comprados
    this.qtyItems=this.cartService.quantityItems()
  }
  ngOnInit():void{
    //Suscripción al método que cuenta la cantidad de items comprados
    this.cartService.countItems.subscribe((valor)=>{
      this.qtyItems=valor
    })
  /*   this.isAuntenticated=false
    this.currentUser={
      email: "isw@prueba.com"
    } */
    this.authService.isAuthenticated.subscribe((valor)=>{
      this.isAuntenticated=valor
      console.log(this.isAuntenticated)
    })
    //Información usuario actual
    this.authService.decodeToken.subscribe((user:any)=>{
      this.currentUser=user
    })
  }
  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
}
