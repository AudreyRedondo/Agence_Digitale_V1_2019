import { TypeConnaissance } from './type-connaissance.model';

export class Avis {
  id: number;
  firstName: string;
  lastName: string;
  job: string;
  company?: string;
  note: number;
  testimonial: string;
  date: Date;
  typeConnaissance: TypeConnaissance;

  constructor(firstName: string, lastName: string, job: string, note: number, testimonial: string, date: Date, typeConnaissance: number, company?: string) {
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.job = job;
    this.company = company;
    this.note = note;
    this.testimonial = testimonial;
    this.date = date;
    this.typeConnaissance = new TypeConnaissance(typeConnaissance, '');
  }
};
