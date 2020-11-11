import { Component, OnInit } from '@angular/core';
import { DomaineCompetence } from '../../../../models/domaine-competence.model';
import { DomaineCompetenceService } from '../../../../services/domaine-competence.service';

@Component({
  selector: 'app-rubrique-detail-competences',
  templateUrl: './rubrique-detail-competences.component.html',
  styleUrls: ['./rubrique-detail-competences.component.css'],
  providers: [DomaineCompetenceService]
})

export class RubriqueDetailCompetencesComponent implements OnInit {

    public competence: DomaineCompetence;
    public competences: DomaineCompetence[];

    constructor(private competenceService: DomaineCompetenceService) { }

    ngOnInit() {
        this.getAll();
    }

    getAll() {
        this.competenceService.getAll().subscribe(
            response => {
                this.competences = response;
            }, error => {
                console.log(error);
            }
        );
    }
}
