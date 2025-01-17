import { Component, OnInit } from '@angular/core';
import { ClientService, Client } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Clientes</h1>
        <button (click)="goToCreate()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Novo Cliente
        </button>
      </div>

      <div class="mb-4">
        <input 
          [(ngModel)]="searchTerm"
          (input)="filterClients()"
          placeholder="Buscar clientes..."
          class="w-full p-2 border rounded"
        >
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border rounded-lg">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 text-left">Nome</th>
              <th class="py-2 px-4 text-left">Email</th>
              <th class="py-2 px-4 text-left">Telefone</th>
              <th class="py-2 px-4 text-left">Data de Nascimento</th>
              <th class="py-2 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let client of filteredClients" class="border-t hover:bg-gray-50">
              <td class="py-2 px-4">{{client.name}}</td>
              <td class="py-2 px-4">{{client.email}}</td>
              <td class="py-2 px-4">{{client.phone}}</td>
              <td class="py-2 px-4">{{client.birth_date | date:'dd/MM/yyyy'}}</td>
              <td class="py-2 px-4 text-center">
                <button (click)="editClient(client.id)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">
                  Editar
                </button>
                <button (click)="deleteClient(client.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.filterClients();
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        // Aqui você pode adicionar uma notificação de erro
      }
    });
  }

  filterClients(): void {
    if (!this.searchTerm) {
      this.filteredClients = this.clients;
      return;
    }
    
    const search = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client => 
      client.name.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search) ||
      client.phone.includes(search)
    );
  }

  goToCreate(): void {
    this.router.navigate(['/clients/create']);
  }

  editClient(id: number): void {
    this.router.navigate(['/clients/edit', id]);
  }

  deleteClient(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
          // Aqui você pode adicionar uma notificação de sucesso
        },
        error: (error) => {
          console.error('Erro ao excluir cliente:', error);
          // Aqui você pode adicionar uma notificação de erro
        }
      });
    }
  }
}