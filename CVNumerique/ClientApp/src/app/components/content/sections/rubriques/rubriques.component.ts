import { Component, OnInit, Input } from '@angular/core';
import { Rubrique } from '../../../../models/rubrique.model';

@Component({
  selector: 'app-rubriques',
  templateUrl: './rubriques.component.html',
  styleUrls: ['./rubriques.component.css']
})

export class RubriquesComponent implements OnInit {

    @Input() rubriques: Rubrique[];
    @Input() serviceID: number;

  constructor() { }

  ngOnInit() { }
}
