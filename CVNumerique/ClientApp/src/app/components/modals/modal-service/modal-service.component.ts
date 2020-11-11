import { Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Process } from '../../../models/process.model';
import { Prestation } from '../../../models/prestation.model';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.css']
})

export class ModalServiceComponent implements OnInit{

    public item: Process;
    public title: string;
    public description: string; 
    public priceList: Prestation[];
    public process: Process[]; 
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
      this.stopCarousel();
      this.title = this.bsModalRef.content.initialState.title;
      this.description = this.bsModalRef.content.initialState.description;
      this.priceList = this.bsModalRef.content.initialState.priceList;
      this.process = this.bsModalRef.content.initialState.process;
  }

  stopCarousel(): void {
    (<any>$('.carousel')).carousel('pause');
  }
}
