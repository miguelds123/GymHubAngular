import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CitaModule } from './cita/cita.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FacturasModule } from './facturas/facturas.module';
import { ProductoModule } from './producto/producto.module';
import { ServicioModule } from './servicio/servicio.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HorarioModule } from './horario/horario.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { OrdenModule } from './orden/orden.module';
import { ProformaModule } from './proforma/proforma.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { HttpAuthInterceptorService } from './share/http-auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    FacturasModule,
    ServicioModule,
    ProductoModule,
    CitaModule,
    HorarioModule,
    SucursalModule,
    OrdenModule,
    ProformaModule,
    AppRoutingModule,
    
    
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
