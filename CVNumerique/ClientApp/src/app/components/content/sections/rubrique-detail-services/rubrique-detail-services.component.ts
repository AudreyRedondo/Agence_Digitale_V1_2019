import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalServiceComponent } from '../../../modals/modal-service/modal-service.component';
import { ServiceService } from '../../../../services/service.service';
import { Service } from '../../../../models/service.model';

@Component({
  selector: 'app-rubrique-detail-services',
  templateUrl: './rubrique-detail-services.component.html',
  styleUrls: ['./rubrique-detail-services.component.css'],
  providers: [ServiceService]
})
export class RubriqueDetailServicesComponent implements OnInit {

  public modalRef: BsModalRef;
  public services: Service[];
  public servicesCompanies: Service[];
  public servicesParticulars: Service[];
  public service: Service;

  constructor(private modalService: BsModalService, private serviceService: ServiceService) { }

  ngOnInit() {
    this.getCompanies();
    this.getParticulars();
  }

  public openModal(serviceId): void {

    this.serviceService.getByID(serviceId).subscribe(response => {
      this.service = response;
      const initialState = {
        title: this.service.title,
        description: this.service.longDescription,
        process: this.service.processList,
        priceList: this.service.priceList,
      };
      this.modalRef = this.modalService.show(ModalServiceComponent, { initialState });
      this.modalRef.content.closeBtnName = 'Close';
    });
  }

  getAll() {
    this.serviceService.getAll().subscribe(
      response => {
        this.services = response;
      }, error => {
        console.log(error);
      }
    );
    }

    getCompanies() {
      this.serviceService.getCompanies().subscribe(
          response => {
              this.servicesCompanies = response;
          }, error => {
              console.log(error);
          }
      );
    }

    getParticulars() {
      this.serviceService.getParticulars().subscribe(
          response => {
              this.servicesParticulars = response;
          }, error => {
              console.log(error);
          }
      );
    }
}
