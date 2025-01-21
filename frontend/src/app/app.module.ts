import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { ClientService } from './services/client.service';
import { ServiceService } from './services/service.service';
import { ProductService } from './services/product.service';
import { AppointmentService } from './services/appointment.service';

// Standalone Components
import { ClientListComponent } from './components/client-list/client-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ClientService,
    ServiceService,
    ProductService,
    AppointmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }