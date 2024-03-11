import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAddressModel } from '../../../app/models/user-address-model';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  registerAddressForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(new UserAddressModel());
  }

  // TODO: Adicionar consulta de cep com o serviço: https://www.gov.br/conecta/catalogo/apis/cep-codigo-de-enderecamento-postal/swagger-json/swagger_view#tag/Consultar-CEP
  onSubmit(): void {}

  createForm(userAddressModel: UserAddressModel): void {
    this.registerAddressForm = this.formBuilder.group({
      street: [
        { value: userAddressModel.street, disabled: true },
        Validators.required,
      ],
      house_number: [userAddressModel.house_number, Validators.required],
      neighborhood: [
        { value: userAddressModel.neighborhood, disabled: true },
        Validators.required,
      ],
      postal_code: [userAddressModel.postal_code, Validators.required],
      country: [
        { value: userAddressModel.country, disabled: true },
        Validators.required,
      ],
    });
  }
}
