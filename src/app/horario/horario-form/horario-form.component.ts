import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
import { FileUploadService } from '../../share/file-upload.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.css'],
})
export class HorarioFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  horarioInfo: any;
  resphorario: any;
  sucursalList: any[] = [];
  DiaSemanaList: any;
  tipoList: any;
  horarioForm: FormGroup;
  idhorario: number = 0;
  isCreate: boolean = true;
  number4digits = /^\d{4}$/;
  currentFile?: File;
  message = '';
  preview = '';
  nameImage = 'image-not-found.jpg';
  imageInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService,
    private uploadService: FileUploadService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idhorario = params['id'];
      if (this.idhorario != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService
          .get('horario', this.idhorario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.horarioInfo = data;
            this.horarioForm.patchValue({
              id: this.horarioInfo.id,
              sucursalId: this.horarioInfo.sucursalId,
              diaSemana: this.horarioInfo.diaSemana,
              fecha: this.horarioInfo.fecha,
              horaInicio: this.horarioInfo.horaInicio,
              horaFin: this.horarioInfo.horaFin,
            });
          });
      }
    });
    this.listSucursales();
    this.listaDiaSemana();
    this.listaTipo();
  }

  formularioReactive() {
    let numberPattern = /^[0-9]+$/;
    this.horarioForm = this.fb.group({
      tipo: [null, Validators.required],
      id: [null, null],
      sucursalId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(numberPattern),
        ]),
      ],
      diaSemana: [null, Validators.required],
      fecha: [null, Validators.required],
      horaInicio: [null, Validators.required],
      horaFin: [null, Validators.required],
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.horarioForm.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {
        if (
          control &&
          control.errors[message.forValidator] &&
          message.forControl == controlName
        ) {
          messageError = message.text;
        }
      }
      return messageError;
    } else {
      return false;
    }
  };

  private convertToGMTDate(timeString: string, date: Date): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const result = new Date(date);
    result.setUTCHours(hours, minutes, 0, 0); // Set the time in UTC
    return result;
  }

  submitHorario(): void {
    if (this.horarioForm.invalid) {
      return;
    }

    if (this.horarioForm.value.tipo === 'Horario') {
      const fecha = this.horarioForm.get('fecha')?.value;
      const horaInicio = this.horarioForm.get('horaInicio')?.value;
      const horaFin = this.horarioForm.get('horaFin')?.value;

      const fechaHoraInicio = this.convertToGMTDate(horaInicio, fecha);
      const fechaHoraFin = this.convertToGMTDate(horaFin, fecha);

      // Verificar si el nuevo horario se superpone con los bloqueos existentes
      this.gService
        .get('bloqueo', this.horarioForm.get('sucursalId')?.value) // Suponiendo que tienes un endpoint para obtener bloqueos por sucursal
        .pipe(takeUntil(this.destroy$))
        .subscribe((bloqueos: any[]) => {
          console.log(bloqueos);

          if (
            this.isHorarioConflict(
              fechaHoraInicio,
              fechaHoraFin,
              fecha,
              bloqueos
            )
          ) {
            this.noti.mensaje(
              'Horario en conflicto',
              'El horario se superpone con un bloqueo existente.',
              TipoMessage.error
            );
            return;
          }

          if (this.isMayorFechaActual(fecha)){
            this.noti.mensaje(
              'Fecha no valida',
              'La fecha seleccionada debe ser mayor a la actual',
              TipoMessage.error
            );
            return;
          }

          const horarioData = {
            ...this.horarioForm.value,
            horaInicio: fechaHoraInicio,
            horaFin: fechaHoraFin,
          };

          this.guardarHorario(horarioData);
        });
    } else {
      const fecha = this.horarioForm.get('fecha')?.value;
      const horaInicio = this.horarioForm.get('horaInicio')?.value;
      const horaFin = this.horarioForm.get('horaFin')?.value;

      const fechaHoraInicio = this.convertToGMTDate(horaInicio, fecha);
      const fechaHoraFin = this.convertToGMTDate(horaFin, fecha);

      // Verificar si el nuevo bloqueo se superpone con los horarios existentes
      this.gService
        .get('horario', this.horarioForm.get('sucursalId')?.value) // Suponiendo que tienes un endpoint para obtener bloqueos por sucursal
        .pipe(takeUntil(this.destroy$))
        .subscribe((bloqueos: any[]) => {
          console.log(bloqueos);

          if (
            this.isHorarioConflict(
              fechaHoraInicio,
              fechaHoraFin,
              fecha,
              bloqueos
            )
          ) {
            this.noti.mensaje(
              'Bloqueo en conflicto',
              'El Bloqueo se superpone con un horario existente.',
              TipoMessage.error
            );
            return;
          }

          if (this.isMayorFechaActual(fecha)){
            this.noti.mensaje(
              'Fecha no valida',
              'La fecha seleccionada debe ser mayor a la actual',
              TipoMessage.error
            );
            return;
          }

          const horarioData = {
            ...this.horarioForm.value,
            horaInicio: fechaHoraInicio,
            horaFin: fechaHoraFin,
          };

          this.guardarHorario(horarioData);
        });
    }
  }

  private isHorarioConflict(
    horaInicio: Date,
    horaFin: Date,
    fecha: Date,
    bloqueos: any[]
  ): boolean {
    return bloqueos.some((bloqueo) => {
      const bloqueoInicio = new Date(bloqueo.horaInicio);
      const bloqueoFin = new Date(bloqueo.horaFin);
      const bloqueoFecha = new Date(bloqueo.fecha);
      console.log();
      return (
        fecha.getDate() === bloqueoFecha.getDate() && // Comparar las fechas
        horaInicio.getUTCHours() < bloqueoFin.getUTCHours() &&
        horaFin.getUTCHours() > bloqueoInicio.getUTCHours()
      );
    });
  }

  private isMayorFechaActual(fecha : Date) : boolean {
    const fechaActual = new Date();
    console.log(fechaActual.getDate(), fecha.getDate())
    return (fecha.getDate() < fechaActual.getDate())
  }

  guardarHorario(horarioData: any) {
    if (horarioData.tipo === 'Horario') {
      if (this.isCreate) {
        this.gService
          .create('horario', horarioData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data: any) => {
              this.resphorario = data;
              this.noti.mensajeRedirect(
                'Crear horario',
                `horario creado`,
                TipoMessage.success,
                '/horariostable'
              );
              this.router.navigate(['/horariostable']);
            },
            error: (err) => {
              console.error('Error al crear el horario:', err);
              this.noti.mensaje(
                'Error',
                'No se pudo crear el horario',
                TipoMessage.error
              );
            },
          });
      } else {
        this.gService
          .update('horario', horarioData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.resphorario = data;
            this.noti.mensajeRedirect(
              'Actualizar horario',
              `horario actualizado`,
              TipoMessage.success,
              'horariostable'
            );
            this.router.navigate(['/horariostable']);
          });
      }
    } else {
      if (this.isCreate) {
        this.gService
          .create('bloqueo', horarioData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data: any) => {
              this.resphorario = data;
              this.noti.mensajeRedirect(
                'Crear bloqueo',
                `Bloqueo creado`,
                TipoMessage.success,
                '/horariostable'
              );
              this.router.navigate(['/horariostable']);
            },
            error: (err) => {
              console.error('Error al crear el bloqueo:', err);
              this.noti.mensaje(
                'Error',
                'No se pudo crear el bloqueo',
                TipoMessage.error
              );
            },
          });
      } else {
        this.gService
          .update('bloqueo', horarioData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.resphorario = data;
            this.noti.mensajeRedirect(
              'Actualizar bloqueo',
              `Bloqueo actualizado`,
              TipoMessage.success,
              'horariostable'
            );
            this.router.navigate(['/horariostable']);
          });
      }
    }
  }

  onReset() {
    this.horarioForm.reset();
  }

  onBack() {
    this.router.navigate(['/horariostable']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listSucursales() {
    this.gService
      .list('sucursal/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any[]) => {
        this.sucursalList = respuesta;
      });
  }

  listaDiaSemana() {
    this.DiaSemanaList = [
      { value: 'Lunes', viewValue: 'Lunes' },
      { value: 'Martes', viewValue: 'Martes' },
      { value: 'Miercoles', viewValue: 'Miercoles' },
      { value: 'Jueves', viewValue: 'Jueves' },
      { value: 'Viernes', viewValue: 'Viernes' },
      { value: 'Sabado', ViewValue: 'Sabado' },
      { value: 'Domingo', ViewValue: 'Domingo' },
    ];
    console.log(this.DiaSemanaList);
  }

  listaTipo() {
    this.tipoList = [
      { value: 'Horario', viewValue: 'Horario' },
      { value: 'Bloqueo', viewValue: 'Bloqueo' },
    ];
  }
}
