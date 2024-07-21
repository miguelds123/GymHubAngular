import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { HttpResponse } from '@angular/common/http';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
import { FileUploadService } from '../../share/file-upload.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrl: './servicio-form.component.css',
})
export class ServicioFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //servicio a actualizar
  servicioInfo: any;
  //Lista de generos
  dificultadList: any;
  //Respuesta del API crear/modificar
  respservicio: any;
  //Nombre del formulario
  servicioForm: FormGroup;
  //id del servicio
  idservicio: number = 0;
  //Sí es crear
  isCreate: boolean = true;
  number4digits = /^\d{4}$/;
  //Imagenes
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
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idservicio = params['id'];
      if (this.idservicio != undefined) {
        //Actualizar
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener el servicio del API que se va actualizar
        this.gService
          .get('servicio', this.idservicio)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data);
            this.servicioInfo = data;

            //Asignar valores al formulario
            this.servicioForm.patchValue({
              id: this.servicioInfo.id,
              nombre: this.servicioInfo.nombre,
              descripcion: this.servicioInfo.descripcion,
              tarifa: this.servicioInfo.tarifa,
              tiempo: this.servicioInfo.tiempo,
              nivelDificultad: this.servicioInfo.nivelDificultad,
              equipamientoNecesario: this.servicioInfo.equipamientoNecesario,
            });
            this.nameImage = this.servicioInfo.imagen;
            //Armar los datos a mostrar en el formulario
          });
        console.log(
          'Formulario actualizado con datos del servicio:',
          this.servicioForm.value
        );
      }
    });
    this.listaDificultad();
  }
  //Crear Formulario
  formularioReactive() {
    let number2decimals = /^[0-9]+[.,]{1,1}[0-9]{2,2}$/;
    let numberPattern = /^[0-9]+$/;
    //[null, Validators.required]
    this.servicioForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      descripcion: [null, Validators.required],
      tarifa: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(numberPattern),
        ]),
      ],
      tiempo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(numberPattern),
          Validators.maxLength(3),
        ]),
      ],
      nivelDificultad: [null, Validators.required],
      equipamientoNecesario: [null, Validators.required],
    });
    console.log('Formulario inicializado:', this.servicioForm);
  }

  listaDificultad() {
    this.dificultadList = [
      { value: 'Alto', viewValue: 'Alto' },
      { value: 'Intermedio', viewValue: 'Intermedio' },
      { value: 'Bajo', viewValue: 'Bajo' },
      { value: 'N/A', viewValue: 'N/A' },
    ];
    console.log(this.dificultadList);
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.servicioForm.get(controlName);
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

  submitservicio(): void {
    //Verificar validación
    if (this.servicioForm.invalid) {
      return;
    }
    console.log(this.servicioForm.value);
    //Datos a guardar en servicio
    //Precio con decimales
    let precioVar = parseFloat(this.servicioForm.get('tarifa').value).toFixed(
      2
    );
    let tiempoVar = parseInt(this.servicioForm.get('tiempo').value);
    //Asignar los valores correctos al formulario patchValue setValue
    this.servicioForm.patchValue({
      tarifa: precioVar,
      tiempo: tiempoVar,
    });
    this.servicioForm.value.imagen = 'default.jpg';
    console.log(this.servicioForm.value);
    //Guardar servicio
    this.guardarservicio();
  }
  guardarservicio() {
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('servicio', this.servicioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.respservicio = data;
            this.noti.mensajeRedirect(
              'Crear servicio',
              `servicio creado: ${data.nombre}`,
              TipoMessage.success,
              '/serviciostable'
            );
            this.router.navigate(['/serviciostable']);
          },
          error: (err) => {
            console.error('Error al crear el servicio:', err);
            this.noti.mensaje(
              'Error',
              'No se pudo crear el servicio',
              TipoMessage.error
            );
          },
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('servicio', this.servicioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respservicio = data;

          this.noti.mensajeRedirect(
            'Actualizar servicio',
            `servicio actualizado: ${data.nombre}`,
            TipoMessage.success,
            'serviciostable'
          );
          this.router.navigate(['/serviciostable']);
        });
    }
  }
  onReset() {
    this.servicioForm.reset();
  }
  onBack() {
    this.router.navigate(['/serviciostable']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        this.nameImage = this.currentFile.name;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
}
