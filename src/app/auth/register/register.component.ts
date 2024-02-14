import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  faArrowLeft = faArrowLeft;
  registerForm = new UntypedFormGroup({});

  constructor(
    private utilService: UtilsService,
    private accountService: AccountService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.utilService.toggle(false);
    this.utilService.hideMenuButton(true);

    this.createForm(new UserModel());
  }

  createForm(registerModel: UserModel): void {
    this.registerForm = this.formBuilder.group({
      name: [registerModel.name, Validators.required],
      cnpj: [registerModel.cnpj, Validators.required],
      email: [
        registerModel.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      confirm_email: [
        registerModel.confirm_email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: [registerModel.password, Validators.required],
      confirm_password: [registerModel.confirm_password, Validators.required],
      phone_number: [
        registerModel.phone_number,
        [Validators.required, Validators.pattern(/^\d{10,}$/)],
      ],
    });
  }

  cnpjValidator(cnpjInput: HTMLInputElement): void {
    const cnpj = cnpjInput.value

    if (cnpj.length < 14) {
      this.registerForm.get('cnpj')?.setErrors({ minLength: true })
    } else {
      this.registerForm.get('cnpj')?.setErrors(null)
    }
  }

  emailMatchValidator(
    emailInput: HTMLInputElement,
    confirmEmailInput: HTMLInputElement
  ): void {
    const email = emailInput.value;
    const confirm_email = confirmEmailInput.value;

    if (email !== confirm_email) {
      this.registerForm.get('confirm_email')?.setErrors({ emailMismatch: true })
    } else {
      this.registerForm.get('confirm_email')?.setErrors(null)
    }
  }

  passwordMatchValidator(
    passwordInput: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement
  ): void {
    const password = passwordInput.value;
    const confirm_password = confirmPasswordInput.value;

    if (password !== confirm_password) {
      this.registerForm
        .get('confirm_password')
        ?.setErrors({ passwordMismatch: true });
    } else {
      this.registerForm.get('confirm_password')?.setErrors(null);
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      this.registerForm
        .get('password')
        ?.setErrors({ missingSpecialChar: true });
    } else {
      this.registerForm.get('password')?.setErrors(null);
    }

    if (password.length < 6) {
      this.registerForm.get('password')?.setErrors({ minLength: true });
    } else {
      this.registerForm.get('password')?.setErrors(null);
    }
  }

  onSubmit(): void {
    this.accountService
      .createUserAccount(this.registerForm.value)
      .subscribe(
        (res) => {
          alert(
            'Parabéns! Você acaba de registrar seu estabelecimento! Aproveite o período de 7 dias grátis.'
          );
        },
        (err) => {
          alert(err.error.message);
        }
      );
  }
}
