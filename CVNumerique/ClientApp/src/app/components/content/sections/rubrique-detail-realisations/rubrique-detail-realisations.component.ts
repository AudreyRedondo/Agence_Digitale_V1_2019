import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Realisation} from '../../../../models/realisation.model';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalRealisationComponent } from '../../../modals/modal-realisation/modal-realisation.component'
import { DomSanitizer } from '@angular/platform-browser';
import { RealisationService } from '../../../../services/realisation.service';

@Component({
  selector: 'app-rubrique-detail-realisations',
  templateUrl: './rubrique-detail-realisations.component.html',
  styleUrls: ['./rubrique-detail-realisations.component.css'],
  providers: [RealisationService]
})

export class RubriqueDetailRealisationsComponent implements OnInit {

  public realisation: Realisation;
  public realisations: Realisation[];
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private sanitizer: DomSanitizer, private realisationService: RealisationService) { }

  ngOnInit() {
    this.getAll();
  }

  public filterProjects(event: Event): void {
    event.preventDefault();

    var filters = $('.filter [data-filter]'), boxes = $('.grid-item[data-category]'), target = $(event.currentTarget);

    filters.removeClass('active');
    target.addClass('active');

    var $filterCategory = target.attr('data-filter');

    if ($filterCategory == 'all') {
      boxes.removeClass('is-animated')
        .fadeOut().promise().done(function () {
          boxes.addClass('is-animated').fadeIn();
        });
    }
    else {
      boxes.removeClass('is-animated')
        .fadeOut().promise().done(function () {
          boxes.filter('[data-category = "' + $filterCategory + '"]')
            .addClass('is-animated').fadeIn();
        });
    }
  }

  public openModal(realisationId): void {

    this.realisationService.getByID(realisationId).subscribe(
      response => {

        this.realisation = response;

        const initialState = {
          title: this.realisation.title,
          category: this.realisation.category,
          project: this.realisation.project,
          client: this.realisation.client,
          delivered: this.realisation.delivered,
          picture: this.sanitizer.bypassSecurityTrustResourceUrl(this.realisation.picture),
          link: this.sanitizer.bypassSecurityTrustResourceUrl(this.realisation.link),
          skills: this.realisation.skills
        };

        this.modalRef = this.modalService.show(ModalRealisationComponent, { initialState });
        this.modalRef.content.closeBtnName = 'Close';

      }, error => {
        console.log(error);
      }
    );
}

  getAll() {
    this.realisationService.getAll().subscribe(
      response => {
        this.realisations = response;
      }, error => {
        console.log(error);
      }
    );
  }
}
