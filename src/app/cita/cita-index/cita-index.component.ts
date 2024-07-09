import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cita-index',
  templateUrl: './cita-index.component.html',
  styleUrls: ['./cita-index.component.css']
})
export class CitaIndexComponent implements OnInit {
  usuarioId = 6; // Variable para almacenar el ID del usuario (asumiendo que se obtiene de algún lugar)
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,// Inyecta tu GenericService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Llamar al método del servicio para obtener las citas de la sucursal por usuario
      this.listarCitasPorUsuario(this.usuarioId);
    });
  }

  // Método para obtener las citas por usuario usando el GenericService
  listarCitasPorUsuario(usuarioId: number) {
    this.genericService.get("sucursal", usuarioId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.datos = respuesta;
      });
  }

  // Método para verificar si un objeto está definido
  isDefined(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  // Método para obtener la clase de color dependiendo del estado de la cita
  getColor(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return '#ffc107'; // Amarillo para estado PENDIENTE
      case 'CONFIRMADA':
        return '#28a745'; // Verde para estado CONFIRMADA
      case 'REPROGRAMADA':
        return '#007bff'; // Azul para estado REPROGRAMADA
      case 'COMPLETADA':
        return '#17a2b8'; // Cyan para estado COMPLETADA
      case 'CANCELADA':
        return '#dc3545'; // Rojo para estado CANCELADA
      case 'NO_ASISTIO':
        return '#6c757d'; // Gris para estado NO_ASISTIO
      default:
        return ''; // En caso de estado desconocido, no se aplica ningún color
    }
  }

  // Método para manejar el detalle de la cita
  detalle(idCita: number) {
    this.router.navigate(['/cita', idCita]); // Navegación a la vista de detalle de producto
    // Implementa la lógica para navegar o mostrar detalles de la cita con el ID proporcionado
    // Ejemplo de navegación a una ruta de detalle de cita
    // this.router.navigate(['/detalle-cita', idCita]); // Asegúrate de importar Router si estás usando la navegación
  }
}
