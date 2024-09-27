import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MostrarPersonalComponent } from './components/mostrar-personal/mostrar-personal.component';
import { TikeosComponent } from './components/tikeos/tikeos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvioNodeComponent } from './components/envio-node/envio-node.component';
import { TikeosOrdenadosComponent } from './components/tikeos-ordenados/tikeos-ordenados.component';


@NgModule({
  declarations: [
    AppComponent,
    MostrarPersonalComponent,
    TikeosComponent,
    EnvioNodeComponent,
    TikeosOrdenadosComponent,
    //HttpClientModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIcon,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
