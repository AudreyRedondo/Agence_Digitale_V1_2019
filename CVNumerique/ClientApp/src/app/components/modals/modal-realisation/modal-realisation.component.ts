import { Component, OnInit} from '@angular/core';
import { Realisation } from '../../../models/realisation.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Competence } from '../../../models/competence.model';
import { TypeRealisation } from '../../../models/type-realisation.model';
import { SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-modal-realisation',
  templateUrl: './modal-realisation.component.html',
    styleUrls: ['./modal-realisation.component.css']
})

export class ModalRealisationComponent implements OnInit {

  public realisation: Realisation;
    public link: SafeResourceUrl;
    public title: string;
    public category: TypeRealisation;
    public project: string;
    public client: string;
    public delivered: Date;
    public skills: Competence[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {}
}
