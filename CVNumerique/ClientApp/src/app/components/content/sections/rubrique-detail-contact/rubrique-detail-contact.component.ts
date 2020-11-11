import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReCaptchaV3Service, ScriptService } from 'ngx-captcha';
import { Contact } from '../../../../models/contact.model';
import { ContactService } from '../../../../services/contact.service';
import { environment } from '../../../../../environments/environment';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-rubrique-detail-contact',
  templateUrl: './rubrique-detail-contact.component.html',
  styleUrls: ['./rubrique-detail-contact.component.css'],
  providers: [ContactService]
})
export class RubriqueDetailContactComponent implements OnInit {

  public contact: Contact;
  public contacts: Contact[];
  public resmessage: string = '';
  public success: boolean = false;
  public error: boolean = false;
  public siteKey?: string = environment.recaptchaSiteKey;
  public action?: string = 'reCaptcha3CVNumerique';
  public token?: string;
  public errorCaptcha?: string;
  public tooltip: string = "Veuillez renseigner tous les champs requis(*)";
  public contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private reCaptchaV3Service: ReCaptchaV3Service, private scriptService: ScriptService, private cdr: ChangeDetectorRef, private isLoadingService: IsLoadingService) { }

  ngOnInit() {

    this.contactForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^0[1-9]([-. ]?[0-9]{2}){4}$")
      ])),
      company: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      message: new FormControl('', Validators.required),
      agree: new FormControl('', Validators.required),
      date: new FormControl(new Date()),
      token: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
  }

  //Save Form  
    async save() {
   
        this.contactService.save(this.contactForm.value)
            .subscribe(response => {
                this.resmessage = response;
                if (this.resmessage === "Le mail a bien été envoyé. Je vous répondrai dans les meilleurs délais.") {
                    this.error = false;
                    this.success = true;
                }
                else {
                    this.success = false;
                    this.error = true;
                }
                this.reset();
            }, error => {
                console.log(error);
            });
  }

  //Get   
  getAll() {
    this.contactService.getAll().subscribe(
      response => {
        this.contacts = response;
      }, error => {
        console.log(error);
      }
    );
  }

  reset() {
    this.contactForm.setValue({
      firstName: null,
      lastName: null,
      company: null,
      phone: null,
      email: null,
      message: null,
      agree: null,
      date: new Date(),
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
                this.contactForm.controls['token'].setValue(token);
                this.cdr.detectChanges();
                this.save();
            }, {
                useGlobalDomain: false
            });
          }),
          { key: 'contactForm-submited' }
      );
      if (result) {
          this.isLoadingService.remove({ key: 'contactForm-submited' });
      }
  }
}

