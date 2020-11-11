import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalPurchaseCvComponent } from '../../modals/modal-purchase-cv/modal-purchase-cv.component';
import { Rubrique } from '../../../models/rubrique.model';
import { RubriqueService } from '../../../services/rubrique.service';
import { ScrollEvent } from 'ngx-scroll-event';
import { NgxUiLoaderService, Loader, SPINNER, POSITION } from 'ngx-ui-loader';

const LOGO_URL = 'assets/img/logo.svg';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [RubriqueService]
})
export class ServiceComponent implements OnInit, AfterViewInit, OnDestroy {
   
  private service$: Observable<Service>;
  public service: Service;
  public modalRef: BsModalRef;
  public rubriquesCV: Rubrique[] = null;
  public nav: Rubrique[] = null;
  public serviceID: number;
  private sub: any;
  loader: any;
  masterLoader: Loader;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private modalService: BsModalService,
    private rubriqueService: RubriqueService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
      this.loader = {
          hasProgressBar: true,
          loaderId: 'loader-01',
          logoUrl: LOGO_URL,
          logoSize: 250,
          isMaster: true,
          spinnerType: SPINNER.threeBounce,
          pbThickness: 4,
          overlayColor: 'rgba(40, 40, 40, 1)',
          fgsPosition: POSITION.centerCenter
      };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.serviceID = +params['id'];
    });
    this.service$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.serviceService.getByID(params.get('id')))
    );
    this.service$.subscribe(response => {
      this.service = response;
    });

    if (this.serviceID == 2) {
        this.getRubriquesCV();
    }
    else {
      this.ngxUiLoaderService.startLoader(this.loader.loaderId);
      setTimeout(() => {
        this.nav = [];
        this.initNavMenu();
        this.ngxUiLoaderService.stopLoader(this.loader.loaderId);
      }, 800)
    }
  }
 
  ngAfterViewInit(): void {
    setTimeout(() => {
        this.initSelectedRubrique();
        this.startAnimations();
    }, 1200);
  }

  getRubriquesCV() {
    this.ngxUiLoaderService.startBackgroundLoader(this.loader.loaderId);
    this.ngxUiLoaderService.startLoader(this.loader.loaderId);
    this.rubriqueService.getContentCV().subscribe(
        response => {
            this.rubriquesCV = response;
            this.nav = this.rubriquesCV;
            this.initNavMenu();
            this.ngxUiLoaderService.stopBackgroundLoader(this.loader.loaderId);
            this.ngxUiLoaderService.stopLoader(this.loader.loaderId);
        }, error => {
            console.log(error);
      });
  }

    initNavMenu() {
      let service = new Rubrique(0, "Service", "fa fa-info", "['/service', " + this.serviceID + "]", "service");
      let contact = new Rubrique(100, "Contact", "fa fa-envelope", "['/presentation']", "contact");
      this.nav.push(service);
      this.nav.push(contact);
      this.nav = this.nav.sort((n1, n2) => n1.id - n2.id);
  }


  initSelectedRubrique() {
    if ($("a[name='Service']").length) {
        $("a[name='Service']").offsetParent()[1].classList.add("selected");
    }
  }

  startAnimations() {
      $('#arSideBox')[0].classList.add('animated');
      $('#arSideBox')[0].classList.remove('hide-on-init');
      $('#arSideBox')[0].classList.add('fadeInLeft');

      $('#arNavScroll')[0].classList.add('animated');
      $('#arNavScroll')[0].classList.remove('hide-on-init');
      $('#arNavScroll')[0].classList.add('fadeInRight');

      $('#service')[0].classList.add('animated');
      $('#service')[0].classList.remove('hide-on-init');
      $('#service')[0].classList.add('fadeInDown');

      $('#arFooter')[0].classList.add('animated');
      $('#arFooter')[0].classList.remove('hide-on-init');
      $('#arFooter')[0].classList.add('fadeInUp');
  }

  public openModal(): void {
    this.modalRef = this.modalService.show(ModalPurchaseCvComponent);
    this.modalRef.content.closeBtnName = 'Close';
    
    var modalContent = $(".modal-content").first();
    modalContent.addClass("pre-commande-content");
    }

    public handleScroll(event: ScrollEvent) {
        var currentHash = "presentation#profil";
        const top = $(window).scrollTop();
        const bottom = $(window).height();
        var viewHeight = Math.max(bottom, window.innerHeight);

        $('.timeline-animated li').each(function () {
            var divTimeline = $(this)[0].getBoundingClientRect();
            var distanceTop = top - $(this).offset().top;
            var distanceBottom = $(this).height() - divTimeline.bottom;
            var viewHeight = Math.max(divTimeline.bottom, divTimeline.height) * 0.4;
            var a = $(this)[0].children[0];
            var b = $(this)[0].children[1];

            if (!(divTimeline.bottom < 0 || divTimeline.top - viewHeight >= 0)) {

                $(this)[0].classList.add('animated');
                $(this)[0].classList.remove('hide-on-init');
                $(a)[0].classList.remove('hide-on-init');
                $(b)[0].classList.remove('hide-on-init');
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
