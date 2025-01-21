import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { ClientService } from '../../../services/client.service';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  clients: any[] = [];
  services: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {
    this.appointmentForm = this.fb.group({
      clientId: ['', Validators.required],
      serviceId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['scheduled']
    });
  }

  ngOnInit() {
    this.loadClients();
    this.loadServices();
  }

  loadClients() {
    this.clientService.getAll().subscribe(
      clients => this.clients = clients,
      error => console.error('Erro ao carregar clientes:', error)
    );
  }

  loadServices() {
    this.serviceService.getAll().subscribe(
      services => this.services = services,
      error => console.error('Erro ao carregar serviços:', error)
    );
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.appointmentService.create(this.appointmentForm.value).subscribe(
        response => {
          console.log('Agendamento criado com sucesso!', response);
          // Adicione aqui a navegação ou feedback ao usuário
        },
        error => console.error('Erro ao criar agendamento:', error)
      );
    }
  }
}