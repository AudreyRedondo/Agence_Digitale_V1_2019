import { Competence } from './competence.model';

export class Experience{
  id: number;
  job: string;
  company?: string;
  city: string;
  sector: string;
  startDate: Date;
  endDate?: Date;
  context?: string;
  details: string;
  skills?: Competence[];
};
