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
}
