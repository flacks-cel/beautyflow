import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent,
    ClientDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ClientListComponent,
    ClientFormComponent,
    ClientDetailComponent
  ]
})
export class ClientsModule { }