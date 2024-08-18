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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['name', 'quantity', 'price', 'total'];
  constructor(private gService: GenericService,
    private route:ActivatedRoute
  ) {
    let id=this.route.snapshot.paramMap.get('id')
    if(!isNaN(Number(id))) 
      this.obtenerFactura(Number(id))
  }
  obtenerFactura(id: any) {
    this.gService
      .get('proforma/detail', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
