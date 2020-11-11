import { Component, OnInit} from '@angular/core';
import { Experience } from '../../../../models/experience.model';
import { ExperienceService } from '../../../../services/experience.service';

@Component({
  selector: 'app-rubrique-detail-experience',
  templateUrl: './rubrique-detail-experience.component.html',
  styleUrls: ['./rubrique-detail-experience.component.css'],
  providers: [ExperienceService]
})

export class RubriqueDetailExperienceComponent implements OnInit {

  public experience: Experience;
  public experiences: Experience[];

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.getAll();
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

  getAll() {
    this.experienceService.getAll().subscribe(
      response => { 
        this.experiences = response;
      }, error => {
        console.log(error);
      }
    );
  }
}
