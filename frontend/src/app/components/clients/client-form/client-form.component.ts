import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService, Client } from '../../../services/client.service';

@Component({
  selector: 'app-client-form',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">{{isEditing ? 'Editar' : 'Novo'}} Cliente</h1>
      
      <form [formGroup]="clientForm" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nome
          </label>
          <input
            formControlName="name"
            id="name"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': submitted && f.name.errors}"
          >
          <div *ngIf="submitted && f.name.errors" class="text-red-500 text-xs mt-1">
            <div *ngIf="f.name.errors.required">Nome é obrigatório</div>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            formControlName="email"
            id="email"
            type="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            [ngClass]="{'border-red-500': submitted && f.email.errors}"
          >
          <div *ngIf="submitted && f.email.errors" class="text-red-500 text-xs mt-1">
            <div *ngIf="f.email.errors.email">Email inválido</div>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Telefone
          </label>
          <input
            formControlName="phone"
            id="phone"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="birth_date">
            Data de Nascimento
          </label>
          <input
            formControlName="birth_date"
            id="birth_date"
            type="date"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {{isEditing ? 'Atualizar' : 'Cadastrar'}}
          </button>
          <button
            type="button"
            (click)="goBack()"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditing = false;
  submitted = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      birth_date: ['']
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEditing = true;
      this.loadClient();
    }
  }

  get f() { return this.clientForm.controls; }

  loadClient(): void {
    this.clientService.getClient(this.id).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client);
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
        // Aqui você pode adicionar uma notificação de erro
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.clientForm.invalid) {
      return;
    }

    const client: Client = this.clientForm.value;

    if (this.isEditing) {
      this.clientService.updateClient(this.id, client).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
          // Aqui você pode adicionar uma notificação de sucesso
        },
        error: (error) => {
          console.error('Erro ao atualizar cliente:', error);
          // Aqui você pode adicionar uma notificação de erro
        }
      });
    } else {
      this.clientService.createClient(client).subscribe({
        next: () => {
          this.router.navigate(['/clients']);
          // Aqui você pode adicionar uma notificação de sucesso
        },
        error: (error) => {
          console.error('Erro ao criar cliente:', error);
          // Aqui você pode adicionar uma notificação de erro
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }
}