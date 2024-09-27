import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarPersonalComponent } from './components/mostrar-personal/mostrar-personal.component';
import { TikeosComponent } from './components/tikeos/tikeos.component';
import { EnvioNodeComponent } from './components/envio-node/envio-node.component';
import { TikeosOrdenadosComponent } from './components/tikeos-ordenados/tikeos-ordenados.component';


const routes: Routes = [
  {path: 'personal', component: MostrarPersonalComponent},
  {path: 'tikeos', component: TikeosComponent},
  {path: 'envio', component: EnvioNodeComponent},
  {path: 'tikeosOrdenados', component: TikeosOrdenadosComponent},
  {path: '', redirectTo: '/tikeos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
