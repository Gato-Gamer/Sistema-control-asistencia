import { MatTableDataSource } from "@angular/material/table";

export function hola(){
    return "Hola";
}

export function filterByDateRange<T>(data: T[], startDate: Date | null, endDate: Date | null, dateField: keyof T): T[] {
      return data.filter(item => {
        const itemDate = new Date(item[dateField] as any);
        return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      });
    }

    export function aplicarFiltro(valorFiltro: string, fechaInicio: Date, fechaFin: Date, dataSource: MatTableDataSource<any>) {
      let iduser : any;
      iduser = parseInt(valorFiltro);
      console.log("id: ",iduser);
      console.log("tipo id: ",typeof iduser);
      if (fechaInicio && fechaFin) {
        
        dataSource.filterPredicate = (data: any, filter: string) => {
          const start = new Date(fechaInicio).getTime();
          const end = new Date(fechaFin).getTime();
          const time = new Date(data.CHECKTIME).getTime();
          const buscar = data.USERID;
          console.log('fecha inicio: ' + start);
          console.log('fecha fin: ' + end);
          console.log('fecha: ' + time);
    
          if(iduser > 0){
            return (
              time >= start &&
              time <= end &&
              buscar === iduser
            );
          }else {
            return (
              time >= start &&
              time <= end
            );
          }
        };
        dataSource.filter = '' + Math.random(); // Filtros necesitan un valor para activar el filtrado
      }
      
    }

    export function aplicarFiltroTikeosOrdenados(valorFiltro: string, fechaInicio: Date, fechaFin: Date, dataSource: MatTableDataSource<any>) {
      let iduser : any;
      iduser = parseInt(valorFiltro);
      console.log("iduser", iduser);
      console.log("tipo id: ",typeof iduser);
      if (fechaInicio && fechaFin) {
        
        dataSource.filterPredicate = (data: any, filter: string) => {
          const start = new Date(fechaInicio).getTime();
          const end = new Date(fechaFin).getTime();
          const time = new Date(data.Mes).getTime();
          const buscar = data.USERID;
          console.log('fecha inicio: ' + start);
          console.log('fecha fin: ' + end);
          console.log('fecha: ' + time);
    
          if(iduser > 0){
            return (
              time >= start &&
              time <= end &&
              buscar === iduser
            );
          }else {
            return (
              time >= start &&
              time <= end
            );
          }
        };
        dataSource.filter = '' + Math.random(); // Filtros necesitan un valor para activar el filtrado
      }
      
    }

    export function filtroById(event: Event, dataSource: MatTableDataSource<any>) {
      const filtroId = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
      dataSource.filterPredicate = (data: any, filter: string) => {
        //this.applyDateFilter();
        return data.USERID === +filter;
      };
  
      // Establecer el filtro para activar el `filterPredicate`
      dataSource.filter = filtroId;
    }