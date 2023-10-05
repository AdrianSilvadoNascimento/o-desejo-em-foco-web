import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { EmployeeModel } from 'src/app/models/employee-model'
import { AccountService } from 'src/app/services/account.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})

  constructor(
    private utilService: UtilsService,
    private formBuilder: FormBuilder,
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
        employee.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: [employee.password, Validators.required],
    })
  }

  onSubmit(): void {
    this.accountService.loginUser(this.loginForm.value).subscribe(res => {
      console.log('Chegou ao component')
    }, err => {
      console.error('Error:', err.error.message)
      alert(err.error.message)
    })
  }
}
