// src/app/features/clients/models/client.model.ts
export interface Client {
    id?: number;
    name: string;
    email: string;
    phone: string;
    created_at?: Date;
  }