import { CoreModule } from './core/core.module'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';
import 'chart.js';
import './chart.piecelabel.js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelect2Module } from 'ng-select2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalRef } from 'ngx-bootstrap';
import { ModalModule} from 'ngx-bootstrap/modal';
import { SidebarModule } from 'ng-sidebar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CountoModule } from 'angular2-counto';
import { ScrollEventModule } from 'ngx-scroll-event';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { DatePipe } from '@angular/common';
import { NgxStripeModule } from 'ngx-stripe';
import { Constants } from './core/constants';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import { IsLoadingModule } from '@service-work/is-loading';
import {
  NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION,
  PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { FlexLayoutModule } from '@angular/flex-layout';

import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(fr);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PresentationComponent } from './components/presentation/presentation.component';
import { RubriquesComponent } from './components/content/sections/rubriques/rubriques.component';
import { RubriqueDetailComponent } from './components/content/sections/rubrique-detail/rubrique-detail.component';
import { RubriqueDetailProfilComponent } from './components/content/sections/rubrique-detail-profil/rubrique-detail-profil.component';
import { RubriqueDetailExperienceComponent } from './components/content/sections/rubrique-detail-experience/rubrique-detail-experience.component';
import { RubriqueDetailCompetencesComponent } from './components/content/sections/rubrique-detail-competences/rubrique-detail-competences.component';
import { RubriqueDetailFormationComponent } from './components/content/sections/rubrique-detail-formation/rubrique-detail-formation.component';
import { RubriqueDetailRealisationsComponent } from './components/content/sections/rubrique-detail-realisations/rubrique-detail-realisations.component';
import { RubriqueDetailLoisirsComponent } from './components/content/sections/rubrique-detail-loisirs/rubrique-detail-loisirs.component';
import { RubriqueDetailContactComponent } from './components/content/sections/rubrique-detail-contact/rubrique-detail-contact.component';
import { LiensExternesComponent } from './components/external-links/liens-externes.component';
import { ChartComponent } from './components/chart/chart.component';
import { ExperienceComponent } from './components/content/experiences/experience.component';
import { RubriqueDetailHeaderComponent } from './components/content/sections/rubrique-detail-header/rubrique-detail-header.component';
import { CompetenceComponent } from './components/content/skills/competence.component';
import { RubriqueDetailServicesComponent } from './components/content/sections/rubrique-detail-services/rubrique-detail-services.component';
import { ModalRealisationComponent } from './components/modals/modal-realisation/modal-realisation.component';
import { ModalServiceComponent } from './components/modals/modal-service/modal-service.component';
import { RubriqueDetailTemoignagesComponent } from './components/content/sections/rubrique-detail-temoignages/rubrique-detail-temoignages.component';
import { ModalAvisComponent } from './components/modals/modal-avis/modal-avis.component';
import { ModalPurchaseCvComponent } from './components/modals/modal-purchase-cv/modal-purchase-cv.component';
import { ServiceComponent } from './components/content/services/service.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AttachementService } from './services/attachement.service';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { FooterComponent } from './components/footer/footer.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: '#27272b',
    fgsColor: '#73264d',
    pbColor: '#27272b',
};

@NgModule({
  declarations: [
    AppComponent,
    RubriquesComponent,
    NavMenuComponent,
    PresentationComponent,
    RubriqueDetailComponent,
    RubriqueDetailProfilComponent,
    RubriqueDetailExperienceComponent,
    RubriqueDetailCompetencesComponent,
    RubriqueDetailFormationComponent,
    RubriqueDetailRealisationsComponent,
    RubriqueDetailLoisirsComponent,
    RubriqueDetailContactComponent,
    LiensExternesComponent,
    ChartComponent,
    ExperienceComponent,
    RubriqueDetailHeaderComponent,
    CompetenceComponent,
    RubriqueDetailServicesComponent,
    ModalRealisationComponent,
    ModalServiceComponent,
    RubriqueDetailTemoignagesComponent,
    ModalAvisComponent,
    ServiceComponent,
    ModalPurchaseCvComponent,
    FileUploadComponent,
    CreditCardComponent,
    FooterComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    SidebarModule.forRoot(),
    NgSelect2Module,
    CountoModule,
    ScrollEventModule,
    AnimateOnScrollModule,
    MatButtonModule,
    IsLoadingModule,
    MatProgressBarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    BsModalRef,
    DatePipe,
    AttachementService,
    Constants
  ],
  entryComponents: [ModalRealisationComponent, ModalServiceComponent, ModalAvisComponent, ModalPurchaseCvComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
