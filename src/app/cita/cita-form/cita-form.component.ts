import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { DatePipe } from '@angular/common'; // Importa DatePipe

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css'],
  providers: [DatePipe] // Añade DatePipe a los proveedores
})
export class CitaFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  citaForm: FormGroup;
  idCita: number = 0;
  isCreate: boolean = true;
  estadosCita: string[] = ['PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'REPROGRAMADA', 'CANCELADA'];
  clientes: any[] = [];
  servicios: any[] = [];
  sucursalNombre: string | null = null; // Nombre de la sucursal
  sucursalId: number | null = null; // ID de la sucursal
  encargadoId: number = 1;
  selectedCliente: any = null; // Cliente seleccionado
  tiempoRequerido: string = ''; // Tiempo requerido para el servicio
  estadoColors: { [key: string]: string } = {
    'PENDIENTE': 'gray',
    'CONFIRMADA': 'blue',
    'COMPLETADA': 'green',
    'REPROGRAMADA': 'orange',
    'CANCELADA': 'red'
  };
  estadoColor: string | null = null;
  minDate: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService,
    private datePipe: DatePipe // Inyecta DatePipe
  ) {
    this.formularioReactive();
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }
  

  ngOnInit(): void {
    this.loadClientes();
    this.loadServicios();

    this.activeRouter.params.subscribe(params => {
      this.idCita = params['id'];
      if (this.idCita !== undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService.get('cita', this.idCita).pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.citaForm.patchValue(data);
        });
      }
    });

    this.getEncargado(this.encargadoId); // Carga la sucursal basado en el id del encargado
  }
  getEstadoColor(estado: string): string {
    return this.estadoColors[estado] || 'black'; // Color por defecto si el estado no está en el mapa
  }
  updateEstadoColor(estado: string): void {
    this.estadoColor = this.estadoColors[estado] || 'black'; // Actualiza el color según el estado
  }
  loadClientes(): void {
    this.gService.list('usuario/cliente/usuario').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.clientes = data;
    });
  }

  loadServicios(): void {
    this.gService.list('servicio').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.servicios = data;
    });
  }

  getEncargado(id: number): void {
    this.gService.get('usuario', id).pipe(takeUntil(this.destroy$)).subscribe(data => {
      const encargado = data;
      this.sucursalId = encargado.sucursalId;
      this.getSucursal(this.sucursalId!);
    });
  }

  getSucursal(id: number): void {
    this.gService.get('sucursal', id).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.sucursalNombre = data.nombre;
    });
  }

  onClienteChange(clienteId: number): void {
    this.selectedCliente = this.clientes.find(cliente => cliente.id === clienteId) || null;
    console.log('Cliente seleccionado:', this.selectedCliente); // Verifica qué datos tienes aquí
    
    if (this.selectedCliente) {
      this.citaForm.patchValue({
        usuarioId: clienteId, // Asegúrate de que esto coincida con el FormControl en el HTML
        nombre: this.selectedCliente.nombre || '',
        email: this.selectedCliente.email || ''
      });
    } else {
      this.citaForm.patchValue({
        nombre: '',
        email: ''
      });
    }
  }
  onServicioChange(servicioId: number): void {
    const servicio = this.servicios.find(serv => serv.id === servicioId);
    this.tiempoRequerido = servicio ? servicio.tiempo : '';
  }

  submitCita(): void {
    if (this.citaForm.invalid) {
      return;
    }

    const cita = this.citaForm.value;

    if (this.isMayorFechaActual(cita.fecha)){
      this.noti.mensaje(
        'Fecha no valida',
        'La fecha seleccionada debe ser mayor a la actual',
        TipoMessage.error
      );
      return;
    }

    // Formatea las fechas y horas
    const fecha = this.formatDateAndTime(cita.fecha,'00:00');
    
    const fechaInicio = this.formatDateAndTime(cita.fecha, cita.horaInicio);
   
    const fechaFin = this.formatDateAndTime(cita.fecha, cita.horaFin);

    cita.sucursalId = this.sucursalId; // Asegúrate de incluir el sucursalId en los datos enviados
    cita.encargadoId = this.encargadoId; // Incluye el encargadoId
    cita.fechaInicio = fechaInicio;
    cita.fechaFin = fechaFin;
    cita.fecha= fecha;
    cita.horaInicio=fechaInicio;
    cita.horaFin=fechaFin;
    if (this.isCreate) {
      this.gService.create('cita/crear', cita).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.noti.mensaje('Cita', 'Cita creada correctamente', TipoMessage.success);
          this.router.navigate(['/citatable']);
        },
        (error) => { // Aquí manejas el error
          this.noti.mensaje('Error', error.error.error, TipoMessage.error);
        }
      );
    } else {
      this.gService.update('cita', cita).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.noti.mensajeRedirect('Actualizar cita', `Cita actualizada para: ${data.usuarioId}`, TipoMessage.success, 'citastable');
        this.router.navigate(['/citatable']);
      });
    }
  }

  private formatDateAndTime(fecha: string | Date, hora: string): string {
    console.log(fecha)
    let fechaCompletaString: string;
  
    if (fecha instanceof Date) {
      // Si fecha es un objeto Date, conviértelo a una cadena en formato ISO
      fechaCompletaString = fecha.toISOString().split('T')[0];
    } else {
      // Si fecha es una cadena, asegúrate de que esté en formato ISO
      fechaCompletaString = fecha;
    }
  
    // Combina la fecha y la hora
    const fechaHoraString = `${fechaCompletaString}T${hora}:00.000`;
  
    // Crea un objeto Date con la cadena construida
    const fechaCompleta = new Date(fechaHoraString);
  
    // Verifica si la fecha es válida
    if (isNaN(fechaCompleta.getTime())) {
      console.error('Error al convertir fecha y hora:', fechaHoraString);
      return '';
    }
  
    // Utiliza DatePipe para formatear la fecha en el formato deseado
    return this.datePipe.transform(fechaCompleta, 'yyyy-MM-dd HH:mm:ss.SSS') as string;
  }

  private isMayorFechaActual(fecha : Date) : boolean {
    const fechaActual = new Date();
    console.log(fechaActual.getDate(), fecha.getDate())
    return (fecha.getDate() < fechaActual.getDate())
  }
  

  onReset(): void {
    this.citaForm.reset();
    this.estadoColor = null;
  }

  onBack(): void {
    this.router.navigate(['/citatable']);
  }

  errorHandling(control: string): string {
    const formControl = this.citaForm.get(control);
    return formControl && formControl.invalid && (formControl.dirty || formControl.touched)
      ? 'Campo obligatorio'
      : '';
  }

  formularioReactive(): void {
    this.citaForm = this.fb.group({
      fecha: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      sucursalId: [{ value: '', disabled: true }, [Validators.required]], // Campo no editable
      usuarioId: ['', [Validators.required]],
      servicioId: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      condicionesMedicas: [''],
      nivelExperiencia: [''],
      objetivoEntrenamiento: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
