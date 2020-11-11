import { Service } from './service.model';
import { Contact } from './contact.model';

export class Payment {
  id: number;
  datePayment: Date;
  amount: number;
  service: Service;
  contact: Contact;
};
