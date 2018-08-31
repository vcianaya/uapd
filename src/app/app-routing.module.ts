import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//COMPONENTS
import { AppLoginComponent } from './components/app-login/app-login.component';
import { RegisterBeneficiarioComponent } from './components/register-beneficiario/register-beneficiario.component';
import { ListBeneficiarioComponent } from './components/list-beneficiario/list-beneficiario.component';
import { UpdateBeneficiarioComponent } from './components/update-beneficiario/update-beneficiario.component';
import { HabilitarBeneficiariosComponent } from './components/habilitar-beneficiarios/habilitar-beneficiarios.component';
import { EmitirBoletaComponent } from './components/emitir-boleta/emitir-boleta.component';
import { BuscarBoletaComponent } from './components/buscar-boleta/buscar-boleta.component';
import { EliminarBoletaComponent } from './components/eliminar-boleta/eliminar-boleta.component';
// GUARDS
import { AfterLoginGuard } from './guards/after-login.service';
import { BeforeLoginGuard } from './guards/before-login.service';




const routes: Routes = [
  { 
    path: 'register-beneficiario', 
    component: RegisterBeneficiarioComponent,
    canActivate: [AfterLoginGuard]
  },
  { 
    path: 'list-beneficiarios', 
    component: ListBeneficiarioComponent,
    canActivate: [AfterLoginGuard]
  },
  { 
    path: 'update-beneficiario/:id', 
    component: UpdateBeneficiarioComponent,
    canActivate: [AfterLoginGuard]
  },
  { 
    path: 'habilitar-beneficiarios', 
    component: HabilitarBeneficiariosComponent,
    canActivate: [AfterLoginGuard]
  },
  { 
    path: 'emitir-boleta', 
    component: EmitirBoletaComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path: 'buscar-boleta',
    component: BuscarBoletaComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path: 'eliminar-boleta',
    component: EliminarBoletaComponent,
    canActivate: [AfterLoginGuard]
  },
  { 
    path: 'login', 
    component: AppLoginComponent,
    canActivate: [BeforeLoginGuard]
  },
  { path: '', 
    redirectTo: 'list-beneficiarios',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: 'list-beneficiarios', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }