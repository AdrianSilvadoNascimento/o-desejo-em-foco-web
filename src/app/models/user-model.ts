export class UserModel {
  id!: string
  name!: string
  email!: string
  confirm_email!: string
  password!: string
  confirm_password!: string
  type!: number
  cnpj!: string
  phone_number!: string
  created_at!: Date
  updated_at!: Date
  expiration_trial!: Date
  is_trial!: boolean
  is_assinant!: boolean
  subscription_plan?: number;
  subscription_id?: number;
  user_address!: [{
    street: string;
    house_number: number;
    neighborhood: string;
    postal_code: string;
    country: string;
    created_at: Date;
    updated_at?: Date;
  }]
}
