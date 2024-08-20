import { Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proforma-detail',
  templateUrl: './proforma-detail.component.html',
  styleUrl: './proforma-detail.component.css'
})
export class ProformaDetailComponent {
  datos: any;
  datosCombinados: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['name', 'quantity', 'price', 'total'];

  constructor(private gService: GenericService, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.obtenerProforma(Number(id));
    }
  }

  obtenerProforma(id: number) {
    this.gService
      .get('proforma/detail', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.datosCombinados = [data]; // Asigna directamente el objeto a la lista
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
