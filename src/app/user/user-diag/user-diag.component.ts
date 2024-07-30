import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-user-diag',
  templateUrl: './user-diag.component.html',
  styleUrl: './user-diag.component.css'
})
export class UserDiagComponent {
  sucursales: any[] = [];
  sucursalForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserDiagComponent>,
    private gService: GenericService,
    private fb: FormBuilder
  ) {
    this.sucursalForm = this.fb.group({
      sucursalId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSucursales();
  }

  loadSucursales() {
    this.gService.list('sucursal/encargado/disponibles')
      .subscribe((respuesta: any) => {
        this.sucursales = respuesta;
      });
  }

  onSubmit() {
    if (this.sucursalForm.valid) {
      this.dialogRef.close(this.sucursalForm.value.sucursalId);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
