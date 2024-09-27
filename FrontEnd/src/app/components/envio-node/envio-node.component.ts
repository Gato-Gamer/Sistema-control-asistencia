import { Component, ViewChild, ElementRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TikeosComponent } from '../tikeos/tikeos.component';

@Component({
  selector: 'app-envio-node',
  templateUrl: './envio-node.component.html',
  styleUrl: './envio-node.component.scss'
})
export class EnvioNodeComponent {

  //para importar el json
  fileContent: any = null;
  fileName: string | null = null;
  respuesta: any = null;
  funRespuestaNodejs: any = null;

  //para importar la bd
  archivoSeleccionado: File | null = null;
  nombreArchivo: string = '';
  obtenerRespuesta: any = null;
  //-----------------

  //Espera de Carga Spinner
  loadingjson: boolean = false;
  loadingAcces: boolean = false;
  //Espera de Carga barra de estado
  progress: number = 0;


  
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild(TikeosComponent) tikeos!:TikeosComponent;//Para ejecutar funciones de otro componente
  title = 'Envio a Bakcend';
  userData = {
    inputData: ''
  };

  //storedData: string | null = null;//Opcion de input
  contenidoData: string | null = null;
 //LEER INPUT 
  constructor(private http: HttpClient) {}

  enviarDato() {
    this.loadingjson = true;
    this.http.post('http://localhost:7000/api/data', this.userData)
      .subscribe(response => {
        console.log('Respuesta del servidor:', response);
        alert('Archivo importado correctamente!!');
        this.loadingjson = false;//spinner/Mensaje de cargando
        this.llamandoTikeos();
      });
  }
//////////////////////////////
  llamandoTikeos(){
    this.tikeos.ngOnInit();
  }

  //Para que la tabla se actualice despues de que termine el proceso
  onSubmit() {
    this.enviarDato();
    this.llamandoTikeos();
  }
  
  //LEER ARCHIVO JSON
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          this.fileContent = JSON.parse(e.target.result);
          //this.sendFileContentToServer(this.fileContent);
          console.log('contenido json: '+JSON.parse(e.target.result));
          this.fileContent = JSON.parse(e.target.result);
          //console.log('valor storedData: '+this.contenidoData);
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
      };

      reader.readAsText(file);
    }
    
  }
//Funcion de confirmacion 
  onConfirm(): void {
    if (this.fileContent) {
      this.loadingjson = true;
      this.http.post('http://localhost:7000/api/archivo', this.fileContent)
        .subscribe(response => {
          console.log('File uploaded successfully', response);
          this.respuesta = response;
          alert('Archivo importado correctamente!!');
          this.loadingjson = false;//spinner/Mensaje de cargando
          this.llamandoTikeos();
        }, error => {
          console.error('Error uploading file', error);
        });
    } else {
      console.error('No file content to upload');
      alert('Por favor seleccione un archivo.');
      
    }
  }
  
  //PARA IMPORTAR LA BD
  //funcion para seleccionar
  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
      this.nombreArchivo = this.archivoSeleccionado.name;
    }
  }

  //funciona de confirmacion
  confirmarSeleccion() {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('file', this.archivoSeleccionado, this.archivoSeleccionado.name);

      this.loadingAcces = true;
      this.http.post('http://localhost:7000/api/bd', formData).subscribe(
        response => {
          console.log('Archivo subido exitosamente', response);
          this.obtenerRespuesta = response;
          alert('Archivo importado correctamente!!');
          this.loadingAcces = false;//spinner/Mensaje de cargando
          //this.progress = 0;//barra de estado
          this.llamandoTikeos();
        },
        error => {
          console.error('Error subiendo el archivo', error);
          //this.loading = false;//Spinner
        }
      );
    }else{
      alert('Por favor seleccione un archivo.');
    }
  }

  


/*
  sendFileContentToServer(fileContent: any): void {
    this.http.post('http://localhost:7000/api/archivo', fileContent)
      .subscribe(response => {
        console.log('Response from server:', response);
      }, error => {
        console.error('Error sending file to server:', error);
      });
  }
  */
/////////////////////////////////////////
/*
//OPCION 2 CON DOS BOTONES
// Abre el diálogo de selección de archivos
openFileSelector(): void {
  this.fileInput.nativeElement.click();
}

// Maneja el archivo seleccionado
onFileSelected2(event: any): void {
  const file: File = event.target.files[0];
  
  if (file) {
    this.fileName = file.name;
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        this.tempFileContent = JSON.parse(e.target.result);
        console.log('Contenido JSON temporal:', this.tempFileContent);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    };

    reader.readAsText(file);
  }
}

  // Confirma la selección del archivo y guarda el contenido
  confirmFileSelection(): void {
    if (this.tempFileContent) {
      this.fileContent = this.tempFileContent;
      this.tempFileContent = null;  // Limpiar el contenido temporal
      this.sendFileContentToServer2(this.fileContent);
    }
  }

  // Envía el contenido del archivo al servidor
  sendFileContentToServer2(fileContent: any): void {
    this.http.post('http://localhost:7000/api/archivo', fileContent)
      .subscribe(response => {
        console.log('Response from server:', response);
      }, error => {
        console.error('Error sending file to server:', error);
      });
  }
      */
/////////////////////////



  /*
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.tikeos.saludo();
  }

  llamandoTikeos() {
    if (this.tikeos) {
      //console.log(this.tikeos.saludo);  // Verifica que la propiedad saludo esté accesible
      this.tikeos.saludo();
    } else {
      console.error('El comonente no esta inicializado.');
    }
  }
  */
}
