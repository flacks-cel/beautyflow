import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';

const routes: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'reports', component: ReportListComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '**', redirectTo: '/clients' },
  { path: 'services', component: ServiceListComponent },
  { path: 'appointments/new', component: AppointmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }