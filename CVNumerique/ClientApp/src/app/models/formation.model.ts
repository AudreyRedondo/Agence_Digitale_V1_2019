export class Formation {
  id: number;
  training: string;
  trainingCenter: string;
  city: string;
  sector: string;
  startDate: Date;
  endDate?: Date;
  context: string;
  graduate: boolean;
  details: string;
  certification: boolean;

  constructor(id: number, training: string, trainingCenter: string, city: string, sector: string, start: Date, end: Date, context: string, graduate: boolean, details: string, certification: boolean) {
    this.id = id;
    this.training = training;
    this.trainingCenter = trainingCenter;
    this.city = city;
    this.sector = sector;
    this.startDate = start;
    this.endDate = end;
    this.context = context;
    this.graduate = graduate;
    this.details = details;
    this.certification = certification;
  }
};
