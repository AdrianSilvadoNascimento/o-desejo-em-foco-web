export class SubscriptionModel {
  payment_token!: string;
  plan_name!: string;
  value!: number;
  account_id!: string;
  billing_address!: {
    street: string;
    number: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    complement: string;
    state: string;
  };

  constructor(payment_token: string, plan_name: string, value: number, account_id: string) {
    this.payment_token = payment_token;
    this.plan_name = plan_name;
    this.value = value;
    this.account_id = account_id;
  }
}
