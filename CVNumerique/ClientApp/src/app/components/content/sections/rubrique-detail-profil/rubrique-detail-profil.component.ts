import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from '../../../../models/chart.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rubrique-detail-profil',
  templateUrl: './rubrique-detail-profil.component.html',
  styleUrls: ['./rubrique-detail-profil.component.css']
})

export class RubriqueDetailProfilComponent implements OnInit, OnDestroy {

  public isLoaded = false;
  public chartModel: Chart;
  public myImg = new Image(56, 56);
  public counto: number;
  public serviceID: number;
  private sub: any;

  // Charts 
  public experience: Chart;
  private labelExperience = ["Web", "Wordpress", "Microsoft", "Specifique"];
  private dataChartExperience = [25, 25, 25, 25];
  private bgExperience = ["#514155", "#73264d", "#c199a0", "#3e3141"];
  private legendExperience = {
    labels: {
      render: 'label',
      fontColor: '#757074'
    }
  }
  public projects: Chart;
  private labelProjects = ["Projets", "Formations"];
  private dataProjects = [80, 20];
  private bgProjects = ["#73264d", "#514155"];
  private scalesProjects = { yAxes: [{ ticks: { beginAtZero: true } }] };
  private tooltipsProjects = {
    callbacks: {
      label: function (tooltipItem, data) {
        return tooltipItem.yLabel + " " + data.datasets[tooltipItem.datasetIndex].label;
      }
    }
  };
  private legendProjects = {
    labels: {
      render: function () {
        return '';
      }
    }
    }

    constructor(private route: ActivatedRoute) {  }

    ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
        this.serviceID = +params['id'];
    });
    this.experience = new Chart(1, "pie", this.labelExperience, this.dataChartExperience, this.bgExperience, "Spécialités", this.legendExperience, false, false, false, '');
        this.projects = new Chart(2, "bar", this.labelProjects, this.dataProjects, this.bgProjects, "Évolution", this.legendProjects, true, false, this.tooltipsProjects, '');
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
