import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./features/clients/clients.module')
      .then(m => m.ClientsModule)
  },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }
];