import { Prestation } from './prestation.model';
import { Attachement } from './attachement.model';

export class CommandeCV {
  id: number;
  date: Date;
  firstName: string;
  lastName: string;
  job: string; 
  company?: string;
  email: string;
  phone: string; 
  details: string;
  serviceId: number;
  token: string;
  intentId: string;
  amount: string;
  resume: File;
  prestations: Prestation[];
  attachements: Attachement[];
};
