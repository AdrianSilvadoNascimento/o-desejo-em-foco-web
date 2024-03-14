import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAddressModel } from '../../../app/models/user-address-model';
import { GetAddressInfoService } from 'src/app/services/get-address-info.service';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  registerAddressForm: FormGroup = new FormGroup({});
  magnifyingGlassLocation = faMagnifyingGlassLocation;

  constructor(
    private formBuilder: FormBuilder,
    private addressInfoService: GetAddressInfoService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createForm(new UserAddressModel());
  }

  completeAddressInfo(): void {
    const postal_code = this.registerAddressForm.get('postal_code')?.value;

    if (postal_code) {
      this.addressInfoService.getAddressInfo(postal_code).subscribe((res) => {
        console.log(res);

        this.registerAddressForm.patchValue({
          street: res['logradouro'],
          neighborhood: res['bairro'],
          country: res['localidade'],
          state: res['uf'],
        });
      });
    }
  }

  onSubmit(): void {
    this.registerAddressForm.get('street')?.enable();
    this.registerAddressForm.get('neighborhood')?.enable();
    this.registerAddressForm.get('country')?.enable();
    this.registerAddressForm.get('state')?.enable();

    this.accountService
      .registerAddress(this.registerAddressForm.value)
      .subscribe(
        (res) => {
          const userId = localStorage.getItem('userId')!!;
          const trialDays = localStorage.getItem('trialDays')!!;
          console.log('retorno:', res);
          this.accountService.userHaveToPay(userId, parseInt(trialDays));
        },
        (err) => {
          console.error(err);
        }
      );
  }

  createForm(userAddressModel: UserAddressModel): void {
    this.registerAddressForm = this.formBuilder.group({
      street: [
        { value: userAddressModel.street, disabled: true },
        Validators.required,
      ],
      house_number: [userAddressModel.house_number, Validators.required],
      complement: [userAddressModel.complement, Validators.required],
      state: [
        { value: userAddressModel.state, disabled: true },
        Validators.required,
      ],
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
