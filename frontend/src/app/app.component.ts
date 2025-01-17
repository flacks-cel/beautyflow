import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <a routerLink="/" class="flex-shrink-0">
                <h1 class="text-xl font-bold text-blue-600">BeautyFlow</h1>
              </a>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a routerLink="/clients" 
                     routerLinkActive="text-blue-600"
                     class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Clientes
                  </a>
                  <a routerLink="/services" 
                     routerLinkActive="text-blue-600"
                     class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Serviços
                  </a>
                  <a routerLink="/products" 
                     routerLinkActive="text-blue-600"
                     class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Produtos
                  </a>
                  <a routerLink="/appointments" 
                     routerLinkActive="text-blue-600"
                     class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Agendamentos
                  </a>
                  <a routerLink="/reports" 
                     routerLinkActive="text-blue-600"
                     class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Relatórios
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="container mx-auto px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  title = 'BeautyFlow';
}
