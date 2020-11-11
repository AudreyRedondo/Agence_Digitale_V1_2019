import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ReCaptchaV3Service, ScriptService } from 'ngx-captcha';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AvisService } from '../../../services/avis.service';
import { Avis } from '../../../models/avis.model';
import { Select2OptionData } from 'ng-select2';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-modal-avis',
  templateUrl: './modal-avis.component.html',
  styleUrls: ['./modal-avis.component.css']
})

export class ModalAvisComponent implements OnInit{
  
  public onClose: Subject<boolean>;
  public title: string = "Rédigez votre commentaire";
  public temoignage: Avis;
  public resmessage: string = '';
  public success: boolean = false;
  public error: boolean = false;
  public siteKey?: string = environment.recaptchaSiteKey;;
  public action?: string = 'reCaptcha3CVNumerique';
  public token?: string;
  public errorCaptcha?: string;
  public tooltip: string = "Veuillez renseigner tous les champs requis(*)";
  public testimonialForm: FormGroup;
  public typesConnaissances: Observable<Array<Select2OptionData>>;
  public selectedValue: string;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private avisService: AvisService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private scriptService: ScriptService,
    private cdr: ChangeDetectorRef,
    private isLoadingService: IsLoadingService
  ) { }

  ngOnInit() {

    this.testimonialForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\s0-9]*$')
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\s0-9]*$')
      ])),
      job: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])),
      typeConnaissanceId: new FormControl('', Validators.required),
      note: new FormControl(3, Validators.required),
      testimonial: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(350),
        Validators.minLength(130)
      ])),
      agree: new FormControl('', Validators.required),
      date: new FormControl(new Date()),
      token: new FormControl(''),
      company: new FormControl('', Validators.compose([
        Validators.maxLength(30)
      ])),
    });

    this.typesConnaissances = this.avisService.getTypesConnaissance();
    this.selectedValue = "";
    this.onClose = new Subject();
  }

  onSubmit() {
    if (this.testimonialForm.invalid) {
      return;
    }
  }

  //Save Form  
  save() {
    this.testimonialForm.controls['typeConnaissanceId'].setValue(+this.selectedValue);

    this.avisService.save(this.testimonialForm.value)
      .subscribe(response => {
        this.resmessage = response;
        if (this.resmessage === "Votre commentaire a bien été enregistré. Merci pour votre retour !") {
          this.error = false;
          this.success = true;
          this.onClose.next(true);
        }
        else {
          this.success = false;
          this.error = true;
          this.onClose.next(false);
        }
        this.reset();
      }, error => {
        console.log(error);
        });
  }

  reset() {
    this.testimonialForm.setValue({
      firstName: null,
      lastName: null,
      job: null,
      company: null,
      note: 3,
      testimonial: null,
      agree: null,
      date: new Date(),
      typeConnaissanceId: null,
      token: null
    });
  }

  async execute() {
      this.token = undefined;

      if (!this.siteKey) {
          this.errorCaptcha = 'Site key is not set';
          return;
      }

      if (!this.action) {
          this.errorCaptcha = 'Action is not set';
          return;
      }

      this.scriptService.cleanup();

      this.error = undefined;
      const result = await this.isLoadingService.add(
          new Promise(res => {
              this.reCaptchaV3Service.execute(this.siteKey, this.action, (token) => {
                  this.token = token;
                  this.testimonialForm.controls['token'].setValue(token);
                  this.cdr.detectChanges();
                  this.save();
              }, {
                  useGlobalDomain: false
              });
          }),
          { key: 'testimonialForm-submited' }
      );
      if (result) {
          this.isLoadingService.remove({ key: 'testimonialForm-submited' });
      }

  }

  public changed(e: any): void {

    this.selectedValue = e.value;
    let testimonial = $('#testimonial');
    let placeholder: string;

    if (this.selectedValue === '1') {
      placeholder = "Quand m'avez-vous sollicitée et pour quelle(s) raison(s) ? La solution livrée répondait-elle au cahier des charges ? Qu-est-ce que cette solution vous a apporté ?"
    }
    else if (this.selectedValue === '2') {
      placeholder = "Quand avons-nous eu l'occasion de travailler ensemble ? Quel était votre rôle dans cette collaboration ? Qu'avez-vous retenu de moi dans cette expérience ?"
    }
    else if (this.selectedValue === '3') {
      placeholder = "Quand m'avez-vous sollicitée et pour quelle(s) raison(s) ? Comment vous ai-je apporté mon aide ? Quel(s) bénéfice(s) avez-vous pu en tirer ?"
    }
    else {
      placeholder = 'Sélectionnez un type de relation dans la liste ci-dessus pour afficher un guide de rédation, puis rédigez ici votre commentaire.';
    }

    testimonial.attr('placeholder', placeholder);
  }
}
