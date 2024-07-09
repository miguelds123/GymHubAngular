import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: boolean;
  currentUser: any;
  qtyItems: number = 1;
  sucursalNombre: string;
  sucursalId: number; // Variable para almacenar el ID de la sucursal

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = true; // Cambiar a lógica real de autenticación
    this.currentUser = {
      email: 'ana.martinez@prueba.com'
    };

    // Obtener el usuario por correo electrónico
    this.getUsuarioByEmail(this.currentUser.email)
      .subscribe((usuario: any) => {
        if (usuario && usuario.id) {
          // Obtener la sucursal por Id del usuario
          this.getSucursalByUserId(usuario.id)
            .subscribe((sucursal: any) => {
              if (sucursal && sucursal.id && sucursal.nombre) {
                this.sucursalId = sucursal.id; // Guardar el ID de la sucursal
                this.sucursalNombre = sucursal.nombre;
              }
            });
        }
      });
  }

  // Función para obtener el usuario por correo electrónico
  getUsuarioByEmail(email: string) {
    return this.http.get(`http://localhost:3000/usuario/email/${email}`);
  }

  // Función para obtener la sucursal por Id del usuario
  getSucursalByUserId(userId: number) {
    return this.http.get(`http://localhost:3000/sucursal/usuario/${userId}`);
  }
}
