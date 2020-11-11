import { Component, OnInit} from '@angular/core';
import { FormationService } from '../../../../services/formation.service';
import { Formation } from '../../../../models/formation.model';

@Component({
  selector: 'app-rubrique-detail-formation',
  templateUrl: './rubrique-detail-formation.component.html',
  styleUrls: ['./rubrique-detail-formation.component.css'],
  providers: [FormationService]
})

export class RubriqueDetailFormationComponent implements OnInit {

  public formation: Formation;
  public formations: Formation[];
  public certifications: Formation[];

  constructor(private formationService: FormationService) { }

  ngOnInit() {
    this.getAllTraining();
    this.getAllCertifications();
  }

  dateDiff = function (fromString: string, toString: string) {
    var from = new Date(fromString);
    var to = new Date(toString);

    if (to === null) {
      let today = new Date();
      to = new Date(today.getFullYear(), today.getMonth());
    }

    let result = to.getMonth() - from.getMonth()
      + (12 * (to.getFullYear() - from.getFullYear())) + 1;

    if (to.getDate() < from.getDate()) {
      result--;
    }

    return result;
    }

    getAllTraining() {
        this.formationService.getAllTraining().subscribe(
            response => {
                this.formations = response;
            }, error => {
                console.log(error);
            }
        );
    }

    getAllCertifications() {
        this.formationService.getAllCertifications().subscribe(
            response => {
                this.certifications = response;
            }, error => {
                console.log(error);
            }
        );
    }
}
