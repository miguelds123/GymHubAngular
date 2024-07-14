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
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FacturasModule } from './facturas/facturas.module';
import { ProductoModule } from './producto/producto.module';
import { ServicioModule } from './servicio/servicio.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    FacturasModule,
    ProductoModule,
    CitaModule,
    AppRoutingModule,
    ServicioModule,
    
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
