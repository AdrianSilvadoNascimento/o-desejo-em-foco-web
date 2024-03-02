import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  planName = 'Plano Ouro';
  paymentForm: FormGroup = new FormGroup({});
  faArrowLeft = faArrowLeft;
  planId!: string;
  subscriptionPlan!: { id: number; planName: string; price: number };

  registeredPlans = [
    {
      id: 1,
      planName: 'Assinatura - Plano Ouro',
      price: parseFloat('1749.90'),
    },
    {
      id: 2,
      planName: 'Assinatura - Plano Prata',
      price: parseFloat('1139.90'),
    },
    {
      id: 3,
      planName: 'Assinatura - Plano Bronze',
      price: parseFloat('899.90'),
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe((params) => {
      this.planId = params['id'];
    });
  }

  ngOnInit(): void {
    this.registeredPlans.filter((plan) => {
      if (plan.id.toString() === this.planId) {
        this.subscriptionPlan = plan
      }
    });
  }

  onSubmit(): void {}
}
