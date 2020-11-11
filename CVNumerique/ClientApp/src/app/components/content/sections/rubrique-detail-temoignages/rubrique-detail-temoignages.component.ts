import { Component, OnInit } from '@angular/core';
import { AvisService } from '../../../../services/avis.service';
import { Avis } from '../../../../models/avis.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalAvisComponent } from '../../../modals/modal-avis/modal-avis.component';

@Component({
  selector: 'app-rubrique-detail-temoignages',
  templateUrl: './rubrique-detail-temoignages.component.html',
  styleUrls: ['./rubrique-detail-temoignages.component.css'],
  providers: [AvisService]
})
export class RubriqueDetailTemoignagesComponent implements OnInit {

  public modalRef: BsModalRef;
  public temoignages: Avis[];

  constructor(private modalService: BsModalService, private temoignageService: AvisService) { }

  ngOnInit() {
    this.getAll();
  }

  public openModal(): void {
    this.modalRef = this.modalService.show(ModalAvisComponent);
    this.modalRef.content.closeBtnName = 'Close';
    this.modalRef.content.onClose.subscribe(result => {
      if (result === true) {
        this.getAll();
      }
    });

    var modalContent = $(".modal-content").first();
    modalContent.addClass("temoignage-content");
  }

  getAll() {
    this.temoignageService.getAll().subscribe(
      response => {
        this.temoignages = response;
      }, error => {
        console.log(error);
      }
    );
  }
}
