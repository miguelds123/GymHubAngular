import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  productoForm: FormGroup;
  idproducto: number = 0;
  isCreate: boolean = true;
  nameImage: string = '';

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
      this.idproducto = params['id'];
      if (this.idproducto !== undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService.get('producto', this.idproducto).pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.productoForm.patchValue(data);
          this.nameImage = data.imagen; // Obtener la ruta de la imagen
        });
      }
    });
  }

  formularioReactive() {
    this.productoForm = this.fb.group({
      id: [null],
      nombre: [null, [Validators.required, Validators.minLength(2)]],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      categoria: [null, Validators.required],
      peso: [null, Validators.required],
      marca: [null, Validators.required],
      imagen: [null] // Maneja la ruta de la imagen como un string
    });
  }

  public errorHandling = (controlName: string) => {
    const control = this.productoForm.get(controlName);
    if (control && control.errors) {
      for (const message of FormErrorMessage) {
        if (control.errors[message.forValidator] && message.forControl === controlName) {
          return message.text;
        }
      }
    }
    return null;
  };

  submitProducto(): void {
    if (this.productoForm.invalid) {
      return;
    }
    const producto = this.productoForm.value;
    if (this.isCreate) {
      this.gService.create('producto', producto).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.noti.mensajeRedirect('Crear producto', `Producto creado: ${data.nombre}`, TipoMessage.success, 'productostable');
        this.router.navigate(['/productostable']);
      });
    } else {
      this.gService.update('producto', producto).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.noti.mensajeRedirect('Actualizar producto', `Producto actualizado: ${data.nombre}`, TipoMessage.success, 'productostable');
        this.router.navigate(['/productostable']);
      });
    }
  }

  onReset() {
    this.productoForm.reset();
  }

  onBack() {
    this.router.navigate(['/productostable']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.nameImage = file.name;
      // Puedes manejar la carga del archivo aquí si es necesario
      // Nota: Solo se está guardando el nombre en el campo 'imagen'
      this.productoForm.patchValue({ imagen: this.nameImage });
    }
  }
}
