export class Chart {
  id: number;
  type: string;
  labels: any;
  data: number[];
  backgroundColours: string[];
  title: string;
  legend: any;
  displayLegend: boolean;
  scales: any;
  tooltips: any;
  legendCentered: string;


  constructor(id: number, type: string, labels: any, data: number[], backgroundColours: string[], title: string, legend: any, displayLegend: boolean, scales: any, tooltips: any, legendCentered: string) {
    this.id = id;
    this.type = type;
    this.labels = labels;
    this.data = data;
    this.backgroundColours = backgroundColours;
    this.title = title;
    this.legend = legend;
    this.displayLegend = displayLegend;
    this.scales = scales;
    this.tooltips = tooltips;
    this.legendCentered = legendCentered;
  }
};
