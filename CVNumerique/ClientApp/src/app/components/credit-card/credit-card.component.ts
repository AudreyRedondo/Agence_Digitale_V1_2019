import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Message } from '../../models/message.model';
import { FormGroup } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { DecryptData } from '../../functions/data';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})

export class CreditCardComponent implements OnInit {

  @Input() amount: string;
  @Input() price: number;
  @Input() formGroup: FormGroup;

  private stripe = Stripe(environment.stripePublishableKey);
  private elements = this.stripe.elements();
  private cardNumberElement: any;
  private cardExpiryElement: any;
  private cardCvcElement: any;
  private card: any[];
  private client_secret: string;
  // dynamic custom for card brand
  private cardBrandToPfClass = {
  'visa': 'fa-cc-visa',
  'mastercard': 'fa-cc-mastercard',
  'unknown': 'fa-credit-card',
  }

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {

    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        color: '#495057',
        fontFamily: 'Arial',
        fontSize: '11px',
        '::placeholder': {
          color: '#6c757d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create elements card
    this.cardNumberElement = this.elements.create('cardNumber', {
      style: style,
      placeholder: 'Numéro de carte'
    });
    this.cardNumberElement.mount('#card-number');

    this.cardExpiryElement = this.elements.create('cardExpiry', {
      style: style,
      placeholder: 'Expiration'
    });
    this.cardExpiryElement.mount('#card-expiry');

    this.cardCvcElement = this.elements.create('cardCvc', {
      style: style,
      placeholder: 'Code de sécurité',
    });
    this.cardCvcElement.mount('#card-cvc');

    // Add event change listener for each elements to display errors
    this.card = [this.cardNumberElement, this.cardExpiryElement, this.cardCvcElement];
    for(let element of this.card){
      this.addEventChangeListener(element);
    }

    // Add event change listener for cardElement to display and switch brand logo
    var that = this;
    this.cardNumberElement.on('change', function (event) {
      if (event.brand) {
        that.setBrandIcon(event.brand);
      }
    });

    //get secret key from server-side
    this.getClientSecret();
  }

  addEventChangeListener(element: any) {
    element.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }

  setBrandIcon(brand: any) {
    var brandIconElement = document.getElementById('brand-icon');
    var pfClass = 'fa-credit-card';
    if (brand in this.cardBrandToPfClass) {
      pfClass = this.cardBrandToPfClass[brand];
    }
    for (let i = brandIconElement.classList.length - 1; i >= 0; i--) {
      brandIconElement.classList.remove(brandIconElement.classList[i]);
    }
    brandIconElement.classList.add('fa');
    brandIconElement.classList.add(pfClass);
  }

  getClientSecret() {
    this.paymentService.getClientSecret(parseInt(this.amount)).subscribe(
      (response: Message) => {
        this.client_secret = DecryptData(response.message);
      }, error => {
        console.log(error);
      }
    );
  }

  createPayment() {
    var intentOptions = {
      payment_method_data: {
        billing_details: {
          name: this.formGroup.controls['firstName'].value + " " + this.formGroup.controls['lastName'].value,
          email: this.formGroup.controls['email'].value,
          phone: this.formGroup.controls['phone'].value,
          address: {
            postal_code: this.formGroup.controls['zipCode'].value,
          },
        }
      },
      receipt_email: this.formGroup.controls['email'].value
    };

    this.handleCardPayment(this.client_secret, intentOptions);
  }

  handleCardPayment(clientSecret: string, intentOptions: {}) {
    var that = this;
    this.paymentService.handleCardPayment(this.stripe.handleCardPayment(clientSecret, this.cardNumberElement, intentOptions))
      .subscribe(response => {
          if (!response.error && response.paymentIntent.status === 'succeeded') {
          that.formGroup.controls['intentId'].setValue(clientSecret);
          that.paymentService.emitPaymentSubject();
        }
        else {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = response.error.message;
        }
      },
      error => {
        console.log(error);
      });
  }
}
