import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-producto-diag',
  templateUrl: './producto-diag.component.html',
  styleUrls: ['./producto-diag.component.css']
})
export class ProductoDiagComponent implements OnInit, OnDestroy {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public datosDialog: any,
    private dialogRef: MatDialogRef<ProductoDiagComponent>,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    if (this.datosDialog && this.datosDialog.id) {
      this.obtenerProducto(this.datosDialog.id);
    }
  }

  obtenerProducto(id: any): void {
    this.gService.get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  close(): void {
    this.dialogRef.close();
  }
}
