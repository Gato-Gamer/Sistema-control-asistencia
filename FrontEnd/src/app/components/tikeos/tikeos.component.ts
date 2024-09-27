import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {hola} from '../../utils/funcionFecha';
import { aplicarFiltro } from '../../utils/funcionFecha';
import { filtroById } from '../../utils/funcionFecha';

import { TicksService } from '../../services/ticks.service';


@Component({
  template: `@for (item of items; track item.key) {{{item.value}}}`,
  selector: 'app-tikeos',
  templateUrl: './tikeos.component.html',
  styleUrl: './tikeos.component.scss'
})
export class TikeosComponent implements OnInit{
  displayedColumns: string[] = ['USERID','CHECKTIME'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //tikeoList: any[] = [];

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  filterValue: string='';

  constructor(private ticksService: TicksService) { 
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
    this.ticksService.getTikeos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      //console.log(data);
    });
  }
saludo() {
  console.log(hola());
}

filtroByIdRengoFecha(){
  aplicarFiltro(this.filterValue, this.fechaInicio,this.fechaFin,this.dataSource);
}

// Filtrado por ID
  applyIdFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      //this.applyDateFilter();
      return data.USERID === +filter;
    };

    // Establecer el filtro para activar el `filterPredicate`
    this.dataSource.filter = filterValue;
  }

   
}

