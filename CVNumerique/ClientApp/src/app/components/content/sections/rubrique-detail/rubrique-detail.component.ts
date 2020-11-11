import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Rubrique } from '../../../../models/rubrique.model';

@Component({
  selector: 'app-rubrique-detail',
  templateUrl: './rubrique-detail.component.html',
  styleUrls: ['./rubrique-detail.component.css']
})
export class RubriqueDetailComponent implements OnInit {
   
  @Input() rubrique: Rubrique;
  @Input() rubriques: Rubrique[];
  @Input() serviceID: number;

  constructor() { }

    ngOnInit() {
    }

}
