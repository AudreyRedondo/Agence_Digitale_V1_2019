import { Component, TemplateRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollEvent } from 'ngx-scroll-event';
import { RubriqueService } from '../../services/rubrique.service';
import { Rubrique } from '../../models/rubrique.model';
import { NgxUiLoaderService, Loader, SPINNER, POSITION } from 'ngx-ui-loader';

const LOGO_URL = 'assets/img/logo.svg';

@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.css'],
    providers: [RubriqueService]
})

export class PresentationComponent implements OnInit, AfterViewInit {

    public rubriques: Rubrique[];
    public rubriquesCV: Rubrique[];
    loader: any;
    masterLoader: Loader;

    constructor(private rubriqueService: RubriqueService, private ngxUiLoaderService: NgxUiLoaderService) {
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

    ngOnInit(): void {
        this.rubriquesCV = null;
        this.getRubriques();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initSelectedRubrique();
            this.startAnimations();
        }, 1200)
    }

    getRubriques() {
      this.ngxUiLoaderService.startLoader(this.loader.loaderId);
      this.rubriqueService.getContentHome().subscribe(
        response => {
            this.rubriques = response;
            this.initSelectedRubrique();
            this.ngxUiLoaderService.stopLoader(this.loader.loaderId);
        }, error => {
            console.log(error);
        });
    }

    startAnimations() {

        $('body').css('background', "url('assets/img/background.png') no-repeat");
        $('body').css('background-attachment', "fixed");
        $('body').css('background-size', "100%");

        $('#arSideBox')[0].classList.add('animated');
        $('#arSideBox')[0].classList.remove('hide-on-init');
        $('#arSideBox')[0].classList.add('fadeInLeft');

        $('#arNavScroll')[0].classList.add('animated');
        $('#arNavScroll')[0].classList.remove('hide-on-init');
        $('#arNavScroll')[0].classList.add('fadeInRight');

        $('#arPaper')[0].classList.add('animated');
        $('#arPaper')[0].classList.remove('hide-on-init');
        $('#arPaper')[0].classList.add('fadeInDown');
    }

    initSelectedRubrique() {
      if ($("a[name='Accueil']").length) {
          $("a[name='Accueil']").offsetParent()[1].classList.add("selected");
          $('html')[0].classList.remove('selected');
      }
    }

    public handleScroll(event: ScrollEvent) {
      var currentHash = "presentation#profil";
      const top = $(window).scrollTop();
      const bottom = $(window).height();
      var viewHeight = Math.max(bottom, window.innerHeight);

        $('.scrollpoint').each(function () {
            var child = $(this).index();
            var divTimeline = $(this)[0].getBoundingClientRect();
            var viewHeight = Math.max(divTimeline.bottom, divTimeline.height) * 0.4;

            if (!(divTimeline.bottom < 0 || divTimeline.top - viewHeight >= 0)) {
                if (child % 2 !== 0) {
                    $(this)[0].classList.add('animated');
                    $(this)[0].classList.remove('hide-on-init');
                    $(this)[0].classList.add('fadeInRight');
                }
                else if (child % 2 === 0) {
                    $(this)[0].classList.add('animated');
                    $(this)[0].classList.remove('hide-on-init');
                    $(this)[0].classList.add('fadeInLeft');
                }
            }
        });

      
      $('.card-animated li').each(function () {
          var child = $(this).index();
          var divTimeline = $(this)[0].getBoundingClientRect();
          var viewHeight = Math.max(divTimeline.bottom, divTimeline.height) * 0.4;

          if (!(divTimeline.bottom < 0 || divTimeline.top - viewHeight >= 0)) {
              if (child%2 !== 0) {
                  $(this)[0].classList.add('animated');
                  $(this)[0].classList.remove('hide-on-init');
                  $(this)[0].classList.add('fadeInRight');
              }
              else if (child%2 === 0) {
                  $(this)[0].classList.add('animated');
                  $(this)[0].classList.remove('hide-on-init');
                  $(this)[0].classList.add('fadeInLeft');
              }
          }
      });

      var contactOff = $(".contact-off");
      if (contactOff.length > 0) {
        var divContactOff = $(".contact-off")[0].getBoundingClientRect();
        var viewHeight = Math.max(divContactOff.bottom, divContactOff.height) * 0.5;

        if (!(divContactOff.bottom < 0 || divContactOff.top - viewHeight >= 0) || viewHeight <= 2070) {

          $(".contact-off")[0].classList.add('active');
          $(".contact-off")[0].classList.remove('black');
          $("#arFooter")[0].classList.remove('hide-on-init');
        }
        else {
          $(".contact-off")[0].classList.add('black');
          $(".contact-off")[0].classList.remove('active');
        }
      }
    }
}
