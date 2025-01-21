export interface Appointment {
    id?: number;
    serviceId: number;
    clientId: number;
    date: Date;
    time: string;
    price: number;
    status: 'scheduled' | 'completed' | 'cancelled';
  }