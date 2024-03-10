import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { CreditCardModel } from '../../../../app/models/credit-card-model';
import { GerenciaNetService } from '../../../../app/services/efi-payment-token.service';
import { SubscriptionModel } from 'src/app/models/subscriptions-model';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnDestroy {
  planName = 'Plano Ouro';
  paymentForm: FormGroup = new FormGroup({});
  creditCardModel: CreditCardModel = new CreditCardModel();
  faArrowLeft = faArrowLeft;
  planId!: string;
  subscriptionPlan!: {
    id: number;
    planName: string;
    planAlias: string;
    price: number;
    real: number;
  };

  subscription: Subscription = new Subscription();

  registeredPlans = [
    {
      id: 1,
      planName: 'Assinatura - Plano Ouro',
      planAlias: 'ouro',
      price: parseFloat('1749.90'),
      real: parseInt('174990'),
    },
    {
      id: 2,
      planName: 'Assinatura - Plano Prata',
      planAlias: 'prata',
      price: parseFloat('1139.90'),
      real: parseInt('113990'),
    },
    {
      id: 3,
      planName: 'Assinatura - Plano Bronze',
      planAlias: 'bronze',
      price: parseFloat('899.90'),
      real: parseInt('89990'),
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private gerencianetService: GerenciaNetService,
    private subscriptionService: SubscriptionsService
  ) {
    this.activatedRouter.params.subscribe((params) => {
      this.planId = params['id'];
    });
  }

  ngOnInit(): void {
    this.registeredPlans.filter((plan) => {
      if (plan.id.toString() === this.planId) {
        this.subscriptionPlan = plan;
      }
    });

    this.createForm(new CreditCardModel());

    this.paymentForm.get('number')!.valueChanges.subscribe((value) => {
      this.getCardBrand(value);
    });
  }

  async onSubmit() {
    const creditCard = this.paymentForm.value;
    creditCard.brand = creditCard.brand.toLowerCase();
    delete creditCard.card_name;

    const payment_token = await this.gerencianetService.getPaymentToken(
      creditCard
    );

    const account_id = localStorage.getItem('userId')!!;
    const subscriptionInfo = new SubscriptionModel(
      payment_token,
      this.subscriptionPlan.planAlias,
      this.subscriptionPlan.real,
      account_id
    );

    console.log('antes de enviar:', subscriptionInfo)
    
    this.subscriptionService
      .contractSubscription(subscriptionInfo)
      .subscribe((res) => {
        console.log('chegou no component:', res);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(creditCardModel: CreditCardModel): void {
    this.paymentForm = this.formBuilder.group({
      card_name: [creditCardModel.card_name, Validators.required],
      brand: [creditCardModel.brand],
      number: [creditCardModel.number, Validators.required],
      expiration_month: [creditCardModel.expiration_month, Validators.required],
      expiration_year: [creditCardModel.expiration_year, Validators.required],
      cvv: [creditCardModel.expiration_month, Validators.required],
    });
  }

  getCardBrand(cardNumber: string): string | null {
    const card = cardNumber.replace(/[^0-9]+/g, '');
    const cards: { [key: string]: RegExp } = {
      visa: /^4[0-9]{12}(?:[0-9]{3})/,
      mastercard: /^5[1-5][0-9]{14}/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      amex: /^3[47][0-9]{13}/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
      elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}/,
      aura: /^(5078\d{2})(\d{2})(\d{11})$/,
    };

    for (const flag in cards) {
      if (cards.hasOwnProperty(flag)) {
        if (cards[flag].test(card)) {
          this.paymentForm.patchValue({ brand: flag });
          return flag;
        }
      }
    }

    this.paymentForm.patchValue({ brand: null });
    return null;
  }
}
