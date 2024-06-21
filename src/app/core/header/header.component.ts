import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuntenticated:boolean
  currentUser:any
  qtyItems:Number=1
  constructor() {
    
  }
  ngOnInit():void{
    this.isAuntenticated=false
    this.currentUser={
      email: "isw@prueba.com"
    }
  }

}
