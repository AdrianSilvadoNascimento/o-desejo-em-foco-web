import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({})
  headerMessage: string = ''
  save_button: string = 'Cadastrar'
  faArrowLeft = faArrowLeft
  employeeId!: string
  employeeTypes: [ { html: string, value: number } ] = [
    { html: 'Funcionário', value: 2 },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activateRoute.params.subscribe(params => {
      this.employeeId = params['id']
    })
  }

  ngOnInit(): void {
    if (this.employeeId?.length) {
      this.employeeService.getEmployeeInfo(this.employeeId).subscribe(employee => {
        this.populateForm(employee)
      }, err => {
        alert(err.error.message)
      })
    }
        
    this.createForm(new EmployeeModel())
  }

  onSubmit(): void {
    const employeeValues = this.employeeForm.value
    
    if (this.employeeId?.length) {
      this.employeeService.updateEmployee(employeeValues, this.employeeId).subscribe(res => {
        this.router.navigate([`/admin/employee-info/${res.id}`])
      }, err => {
        alert(err.error.message)
      })
    } else {
      this.employeeService.registerEmployee(employeeValues).subscribe(res => {
        this.createForm(new EmployeeModel())
      }, err => {
        alert(err.error.message)
      })
    }
  }

  populateForm(employeeModel: EmployeeModel): void {
    this.employeeForm.patchValue({
      name: employeeModel.name,
      lastname: employeeModel.lastname,
      email: employeeModel.email,
      password: employeeModel.password,
      type: employeeModel.type,
    })
  }

  createForm(employeeModel: EmployeeModel): void {
    this.employeeForm = this.formBuilder.group({
      name: [employeeModel.name, Validators.required],
      lastname: [employeeModel.lastname, Validators.required],
      password: [employeeModel.password, Validators.required],
      type: [employeeModel.type, Validators.required],
      email: [employeeModel.email,
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ],
      ],
    })
  }

  return(): void {
    this.router.navigate([this.employeeId ? `/admin/info-employee/${this.employeeId}` : '/admin/employee'])
  }
}
