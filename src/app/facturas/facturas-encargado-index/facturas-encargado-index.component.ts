import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facturas-encargado-index',
  templateUrl: './facturas-encargado-index.component.html',
  styleUrl: './facturas-encargado-index.component.css'
})
export class FacturasEncargadoIndexComponent {
  //Respuesta del API
  datos:any
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService: GenericService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    let id=this.route.snapshot.paramMap.get('id')
    if(!isNaN(Number(id))) 
      this.listFacturas(Number(id))
  }
  //Listar todos los videojuegos del API
  listFacturas(id: any){
    //localhost:3000/videojuego
    this.gService.get("facturaAdministrador", id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      console.log(respuesta)
      this.datos=respuesta
    }
      
    )
  }
  detalle(id:number){
    this.router.navigate(['/factura',id])
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
