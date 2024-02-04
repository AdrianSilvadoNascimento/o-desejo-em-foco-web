import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { EmployerModel } from 'src/app/models/employer-model'
import { AccountService } from 'src/app/services/account.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  faArrowLeft = faArrowLeft
  registerForm = new UntypedFormGroup({})

  constructor(
    private utilService: UtilsService,
    private accountService: AccountService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.utilService.toggle(false)
    this.utilService.hideMenuButton(true)

    this.createForm(new EmployerModel())
  }

  createForm(registerModel: EmployerModel): void {
    this.registerForm = this.formBuilder.group({
      name: [registerModel.name, Validators.required],
      email: [
        registerModel.email, [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: [registerModel.password, Validators.required],
    })
  }

  onSubmit(): void {
    this.accountService.createNewEmployerAccount(this.registerForm.value).subscribe(res => {
      alert('Parabéns! Você acaba de registrar seu estabelecimento! Aproveite o período de 7 dias grátis.')
    }, err => {
      alert(err.error.message)
    })
  }
}
