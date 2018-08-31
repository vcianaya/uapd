import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { AgmCoreModule } from '@agm/core';
// COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { RegisterBeneficiarioComponent } from './components/register-beneficiario/register-beneficiario.component';
import { ListBeneficiarioComponent } from './components/list-beneficiario/list-beneficiario.component';
import { UpdateBeneficiarioComponent } from './components/update-beneficiario/update-beneficiario.component';
import { HabilitarBeneficiariosComponent } from './components/habilitar-beneficiarios/habilitar-beneficiarios.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { EmitirBoletaComponent } from './components/emitir-boleta/emitir-boleta.component';
import { BuscarBoletaComponent } from './components/buscar-boleta/buscar-boleta.component';

//SERVICES
import { LogginService } from './authenticate/loggin.service';

//HTTP INTERCEPTOR
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { EliminarBoletaComponent } from './components/eliminar-boleta/eliminar-boleta.component';
//GUARD
import { AplicationErrorHandle } from "./app.error-handle";
import { AfterLoginGuard } from './guards/after-login.service';
import { BeforeLoginGuard } from './guards/before-login.service';
import { AuthService } from './authenticate/auth.service';
import { MesesPipe } from './pipes/meses.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    RegisterBeneficiarioComponent,
    ListBeneficiarioComponent,
    UpdateBeneficiarioComponent,
    HabilitarBeneficiariosComponent,
    SidebarComponent,
    HeaderComponent,
    EmitirBoletaComponent,
    BuscarBoletaComponent,
    EliminarBoletaComponent,
    MesesPipe
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKE2bdGVHKLyN6a5HD6lWffpWNlbq3LsM'
    }),
    AppRoutingModule
  ],
  providers: [
    LogginService,
    AfterLoginGuard,
    BeforeLoginGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    // { provide: ErrorHandler, useClass: AplicationErrorHandle }`
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
