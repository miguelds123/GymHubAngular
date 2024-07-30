import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursal-form.component.html',
  styleUrl: './sucursal-form.component.css'
})
export class SucursalFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  sucursalForm: FormGroup;
  idsucursal: number = 0;
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      this.idsucursal = params['id'];
      if (this.idsucursal !== undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService.get('sucursal', this.idsucursal).pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.sucursalForm.patchValue(data);
        });
      }
    });
  }

  formularioReactive() {
    this.sucursalForm = this.fb.group({
      id: [null],
      nombre: [null, [Validators.required, Validators.minLength(2)]],
      descripcion: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  public errorHandling = (controlName: string) => {
    const control = this.sucursalForm.get(controlName);
    if (control && control.errors) {
      for (const message of FormErrorMessage) {
        if (control.errors[message.forValidator] && message.forControl === controlName) {
          return message.text;
        }
      }
    }
    return null;
  };

  submitSucursal(): void {
    if (this.sucursalForm.invalid) {
      return;
    }
    const sucursal = this.sucursalForm.value;
    if (this.isCreate) {
      this.gService.create('sucursal', sucursal).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.noti.mensajeRedirect('Crear sucursal', `Sucursal creada: ${data.nombre}`, TipoMessage.success, 'sucursalestable');
        this.router.navigate(['/sucursalestable']);
      });
    } else {
      this.gService.update('sucursal', sucursal).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.noti.mensajeRedirect('Actualizar sucursal', `Sucursal actualizada: ${data.nombre}`, TipoMessage.success, 'sucursalestable');
        this.router.navigate(['/sucursalestable']);
      });
    }
  }

  onReset() {
    this.sucursalForm.reset();
  }

  onBack() {
    this.router.navigate(['/sucursalestable']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
