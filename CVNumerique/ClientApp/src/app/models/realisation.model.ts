import { Competence } from './competence.model';
import { TypeRealisation } from './type-realisation.model';

export class Realisation {
  id: number;
  title: string;
  resume: string;
  client: string;
  delivered: Date
  project: string;
  link: string;
  picture: string;
  skills: Competence[];
  category: TypeRealisation;
};
