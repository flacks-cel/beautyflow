import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  template: `
    <div class="container mt-4">
      <h2>{{ editMode ? 'Editar Cliente' : 'Novo Cliente' }}</h2>
      
      <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Nome Completo*</label>
              <input 
                type="text" 
                class="form-control" 
                id="name"
                formControlName="name"
                [ngClass]="{'is-invalid': submitted && f.name.errors}"
              >
              <div *ngIf="submitted && f.name.errors" class="invalid-feedback">
                <div *ngIf="f.name.errors.required">Nome é obrigatório</div>
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email*</label>
              <input 
                type="email" 
                class="form-control" 
                id="email"
                formControlName="email"
                [ngClass]="{'is-invalid': submitted && f.email.errors}"
              >
              <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
                <div *ngIf="f.email.errors.required">Email é obrigatório</div>
                <div *ngIf="f.email.errors.email">Email inválido</div>
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Telefone*</label>
              <input 
                type="tel" 
                class="form-control" 
                id="phone"
                formControlName="phone"
                mask="(00) 00000-0000"
                [ngClass]="{'is-invalid': submitted && f.phone.errors}"
              >
              <div *ngIf="submitted && f.phone.errors" class="invalid-feedback">
                <div *ngIf="f.phone.errors.required">Telefone é obrigatório</div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="birthDate">Data de Nascimento</label>
              <input 
                type="date" 
                class="form-control" 
                id="birthDate"
                formControlName="birthDate"
              >
            </div>

            <div class="form-group">
              <label for="preferences">Preferências de Serviços</label>
              <textarea 
                class="form-control" 
                id="preferences"
                formControlName="preferences"
                rows="3"
                placeholder="Ex: Corte em camadas, coloração tons quentes..."
              ></textarea>
            </div>

            <div class="form-group">
              <label>Aceita receber promoções?</label>
              <div class="form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="promotionalEmails"
                  formControlName="promotionalEmails"
                >
                <label class="form-check-label" for="promotionalEmails">
                  Sim, desejo receber promoções por email
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col">
            <button type="button" class="btn btn-secondary mr-2" (click)="onCancel()">Cancelar</button>
            <button type="submit" class="btn btn-primary">
              {{ editMode ? 'Atualizar' : 'Cadastrar' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  submitted = false;
  editMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: [''],
      preferences: [''],
      promotionalEmails: [false]
    });

    // Verifica se está em modo de edição pela URL
    if (this.router.url.includes('edit')) {
      this.editMode = true;
      // Aqui você pode carregar os dados do cliente para edição
      // this.loadClientData();
    }
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.clientForm.invalid) {
      return;
    }

    if (this.editMode) {
      this.clientService.updateClient(this.clientForm.value).subscribe(
        response => {
          console.log('Cliente atualizado com sucesso', response);
          this.router.navigate(['/clients']);
        },
        error => {
          console.error('Erro ao atualizar cliente', error);
        }
      );
    } else {
      this.clientService.createClient(this.clientForm.value).subscribe(
        response => {
          console.log('Cliente cadastrado com sucesso', response);
          this.router.navigate(['/clients']);
        },
        error => {
          console.error('Erro ao cadastrar cliente', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}