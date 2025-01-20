// src/app/features/clients/client-list/client-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
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
      next: (data: any[]) => {
        this.clients = data;
        this.filteredClients = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar clientes:', error);
      }
    });
  }

  filterClients(): void {
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.filterClients();
  }

  editClient(id: number): void {
    this.router.navigate(['/clients/edit', id]);
  }

  deleteClient(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
        },
        error: (error: any) => {
          console.error('Erro ao excluir cliente:', error);
        }
      });
    }
  }
}