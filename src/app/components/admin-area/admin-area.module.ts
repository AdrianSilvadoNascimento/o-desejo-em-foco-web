import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IndexComponent } from './index/index.component'
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component'
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeFormComponent } from './employee-form/employee-form.component'

@NgModule({
  declarations: [
    IndexComponent,
    EmployeeComponent,
    EmployeeFormComponent,
  ],
  imports: [
    AngularMaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'index', component: IndexComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'register-employee', component: EmployeeFormComponent },
      { path: 'update-employee/:id', component: EmployeeFormComponent },
    ]),
  ]
})
export class AdminAreaModule { }
