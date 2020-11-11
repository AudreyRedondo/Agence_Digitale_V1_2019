import { Process } from './process.model';
import { Prestation } from './prestation.model';

export class Service {
  id: number;
  title: string;
  picture: string;
  shortDescription: string;
  longDescription: string;
  processList: Process[];
  priceList: Prestation[];
};
