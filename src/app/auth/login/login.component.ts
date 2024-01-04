import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'

import { EmployeeModel } from 'src/app/models/employee-model'
import { AccountService } from 'src/app/services/account.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: UntypedFormGroup = new UntypedFormGroup({})

  constructor(
    private utilService: UtilsService,
    private formBuilder: UntypedFormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createForm(new EmployeeModel())
    this.utilService.toggle(false)
    this.utilService.hideMenuButton(true)
  }

  createForm(employee: EmployeeModel): void {
    this.loginForm = this.formBuilder.group({
      email: [
        employee.email, [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: [employee.password, Validators.required],
    })
  }

  onSubmit(): void {
    this.accountService.loginUser(this.loginForm.value).subscribe(() => {
      this.utilService.toggle(false)
    }, err => {
      console.error('Error:', err)
      alert(err)
    })
  }
}
