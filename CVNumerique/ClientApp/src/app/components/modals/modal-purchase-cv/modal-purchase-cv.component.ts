import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ReCaptchaV3Service, ScriptService } from 'ngx-captcha';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommandeCvService } from '../../../services/commande-cv.service';
import { requiredFileType } from '../../../functions/files';
import { AttachementService } from '../../../services/attachement.service';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { CreditCardComponent } from '../../credit-card/credit-card.component'; 
import { Constants } from '../../../core/constants';

@Component({
  selector: 'app-modal-purchase-cv',
  templateUrl: './modal-purchase-cv.component.html',
  styleUrls: ['./modal-purchase-cv.component.css'],
  providers: [
    AttachementService, CommandeCvService, PaymentService
  ]
})

export class ModalPurchaseCvComponent implements OnInit {

  public title: string = "Pré-commandez votre CV pertinent et original";
  public resmessage: string = '';
  public success: boolean = false;
  public error: boolean = false;
  public siteKey?: string = environment.recaptchaSiteKey;
  public action?: string = 'reCaptcha3CVNumerique';
  public token?: string;
  public paymentToken?: string;
  public errorCaptcha?: string;
    public tooltip: string = "Veuillez renseigner tous les champs requis(*)";
    public check: boolean;
  
  private file: File;
  private paymentSubscription: Subscription;
  @ViewChild(CreditCardComponent) child: CreditCardComponent;
  public amount: string;
  public price: number;
  public preorderForm: FormGroup;
 
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private CommandeCVService: CommandeCvService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private scriptService: ScriptService,
    private cdr: ChangeDetectorRef,
    private attachementService: AttachementService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {

    this.preorderForm = this.formBuilder.group({
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
        Validators.maxLength(30),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\s0-9]*$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^0[1-9]([-. ]?[0-9]{2}){4}$")
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      zipCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ])),
      resume: new FormControl(null, [Validators.required, requiredFileType('png')]),
      details: new FormControl('', Validators.compose([
        Validators.maxLength(350),
        Validators.minLength(130)
      ])),
      serviceId: new FormControl(4, Validators.required),
      agree: new FormControl('', Validators.required),
      downPayment: new FormControl('', Validators.required),
      date: new FormControl(new Date()),
      token: new FormControl(''),
      payment: new FormControl(''),
      intentId: new FormControl(''),
      amount: new FormControl(this.amount)
    });

    this.price = Constants.resumeDownpayment;
    this.amount = Constants.resumeDownpayment.toFixed(2).split('.').join("");

    this.paymentSubscription = this.paymentService.paymentSubject.subscribe(
      (hasSucceed : boolean) => {
        if (hasSucceed) {
          this.save();
        }
      }
    );
  }

  uploadAttachement(attachmentTypeId) {
    let objectFile = { file: this.file, attachmentTypeId: attachmentTypeId }
    this.attachementService.upload(objectFile).subscribe(result => {
      if (result !== null) {
      }
    }, error => {
      console.log(error);
    });
  }

  getFile(file: File) {
    this.file = file;
  }

  onSubmit() {
    if (this.preorderForm.invalid) {
      return;
    }
  }

  // Save Form  
  save() {
    //this.CommandeCVService.saveOrderResume(this.preorderForm.value)
    //  .subscribe(response => {
    //    this.resmessage = response;
    //    if (this.resmessage === "Votre pré-commande a bien été enregistrée et je vous en remercie. D'ici 48 à 72h, vous recevrez un mail. Pour visualiser votre CV pertinent et original et le télécharger, il vous faudra cliquer sur le lien contenu dans ce mail.") {
    //      this.error = false;
    //      this.success = true;
    //    }
    //    this.reset();
    //  }, error => {
    //    console.log(error);
    //  });
  }

  reset() {
    this.preorderForm.setValue({
      firstName: null,
      lastName: null,
      job: null,
      phone: null,
      email: null,
      zipCode: null,
      payment: null,
      details: null,
      agree: null,
      downPayment: null,
      date: new Date(),
      resume: null,
      serviceId: 4,
      token: null,
      intentId: null,
      amount: this.amount
    });
  }

  execute(): void {
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

    const getToken = this.reCaptchaV3Service.execute(this.siteKey, this.action, (token) => {
      this.token = token;
      this.preorderForm.controls['token'].setValue(token);
      this.cdr.detectChanges();
      // call payment methods
      this.child.createPayment();
    },
    {
      useGlobalDomain: false
    });
  }

  ngOnDestroy() {
    this.paymentSubscription.unsubscribe();
  }
}
