import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';  // Não precisa ser importado aqui

@NgModule({
  declarations: [
    //AppComponent,  // Apenas o AppComponent aqui
    // Não inclua mais os outros componentes standalone na declaração
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Não inclua mais os componentes standalone como ReportListComponent aqui
  ],
  providers: [],
  //bootstrap: [AppComponent]  // Co mponente standalone para inicialização
})
export class AppModule {}
