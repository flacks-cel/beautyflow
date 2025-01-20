import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module'; // Importe o módulo de rotas
import { AppComponent } from './app.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { ClientsModule } from './features/clients/clients.module';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule  // Use o módulo de rotas aqui
    ClientsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }