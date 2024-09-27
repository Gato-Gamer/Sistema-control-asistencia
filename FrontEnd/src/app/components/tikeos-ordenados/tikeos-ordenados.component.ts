import { Component, OnInit,ViewChild} from '@angular/core';
import { TikeoPersonalOrdenadoService } from '../../services/tikeo-personal-ordenado.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';

import { aplicarFiltroTikeosOrdenados } from '../../utils/funcionFecha';

import { filterByDateRange } from '../../utils/funcionFecha';

interface UserData {
  USERID: string;
  numCi: string;
  nombre: string;
  date: string;
  time: string;
}

@Component({
  template: `@for (item of items; track item.key) {{{item.value}}}`,
  selector: 'app-tikeos-ordenados',
  templateUrl: './tikeos-ordenados.component.html',
  styleUrl: './tikeos-ordenados.component.scss'
})
export class TikeosOrdenadosComponent implements OnInit {
 tikeosData: any[] = [];

  displayedColumns: string[] = ['USERID', 'Badgenumber', 'Name', 'Mes','FECHA'];//
  columnasDinamicasTimes: string[] = [];

  uniqueIds: string[] = [];
  uniqueMeses: string[] = [];

  mesSeleccionado: string='';
  idSeleccionado: number=0;
  
  dataSourceTable = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  filterValue: string='';

  

    constructor(private checktimeService: TikeoPersonalOrdenadoService) {      
      this.dataSourceTable = new MatTableDataSource<any>;
    }

    ngOnInit(): void {
      
      this.checktimeService.getTikeos().subscribe(data => {
        this.tikeosData = data;
        
        this.dataSourceTable.data = this.tikeosData;
        this.dataSourceTable.paginator = this.paginator;
        
        this.generarColumnasDinamicas();

         // Obtener valores únicos para cada columna
        this.uniqueIds = [...new Set(this.dataSourceTable.data.map(item => item.USERID))];
        
        this.uniqueMeses = [...new Set(this.dataSourceTable.data.map(item => item.mes))];
        
      });
      
      
    }
    
  // Function to generate dynamic columns based on max times array length
  generarColumnasDinamicas(): void {
     // Verificar si hay datos
  if (!this.tikeosData || this.tikeosData.length === 0) {
    console.error('No hay datos para generar columnas');
    return;
  }

  const countTimes = Math.max(...this.tikeosData.map(item => {
    // Asegurarse de que times es un array antes de acceder a su longitud
    return item.times && Array.isArray(item.times) ? item.times.length : 0;
  }));
  
    // Generate column names like 'time0', 'time1', etc., for each time slot
    this.columnasDinamicasTimes = Array.from({ length: countTimes }, (_, index) => `time${index}`);
    // Verificar si columnasDinamicasTimes se llenó correctamente
    console.log('Columnas dinámicas generadas:', this.columnasDinamicasTimes);

    // Combine 'date' column with generated dynamic columns
    this.displayedColumns = ['USERID', 'Badgenumber', 'Name', 'Mes','FECHA', ...this.columnasDinamicasTimes];

  }
  
  // Filtrado por ID
  applyIdFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSourceTable.filterPredicate = (data: any, filter: string) => {
      //this.applyDateFilter();
      return data.USERID === +filter;
    };

    // Establecer el filtro para activar el `filterPredicate`
    this.dataSourceTable.filter = filterValue;
  }
    // Función para filtrar los datos
    applyFilterMes(event: MatSelectChange) {
      const filterValue = event.value;
      this.dataSourceTable.filter = filterValue.trim().toLowerCase();
    }
    // Función para filtrar los datos
  applyFilterCarnet(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTable.filter = filterValue.trim().toLowerCase();
  }
  filtroByIdRengoFec(){
    aplicarFiltroTikeosOrdenados(this.filterValue, this.fechaInicio,this.fechaFin,this.dataSourceTable);
  }
  aplicarFiltroPorFecha() {
    if (this.fechaInicio && this.fechaFin) {
      this.dataSourceTable.filterPredicate = (dataSourceTable, filter: string) => {
        // Convierte la fecha al formato adecuado
        const fecha = convertirFecha(dataSourceTable.date);
        const inicio = new Date(this.fechaInicio);
        const fin = new Date(this.fechaFin);
  
        // Verifica si la fecha está dentro del rango
        return fecha >= inicio && fecha <= fin;
      };
      this.dataSourceTable.filter = '' + Math.random(); // Fuerza el filtro
    }
  }
  
  
}

function convertirFecha(fechaString: string): Date {
  // Descomponer la fecha en día, mes y año
  const [dia, mes, año] = fechaString.split('/');

  // Crear una nueva fecha en formato yyyy-mm-dd
  const fechaFormateada = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  return new Date(fechaFormateada);
}