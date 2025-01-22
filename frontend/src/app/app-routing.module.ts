import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de Lista
import { ClientListComponent } from './components/client-list/client-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';

// Componentes de Formulário
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { AppointmentFormComponent } from './components/appointments/appointment-form/appointment-form.component';

const routes: Routes = [
  // Rotas de Listagem
  { path: 'clients', component: ClientListComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'reports', component: ReportListComponent },
  
  // Rotas de Formulários
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'appointments/new', component: AppointmentFormComponent },
  
  // Rotas de Redirecionamento
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '**', redirectTo: '/clients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }