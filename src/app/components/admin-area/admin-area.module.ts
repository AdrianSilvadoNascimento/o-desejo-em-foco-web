import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularMaterialModule } from '../../../app/angular-material.module';
import { IndexComponent } from './index/index.component'
import { EmployeeComponent } from './employee/employee.component'
import { EmployeeFormComponent } from './employee-form/employee-form.component'
import { InfoClientComponent } from '../info-client/info-client.component';

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
      { path: 'employee-info/:id', component: InfoClientComponent },
      { path: 'update-employee/:id', component: EmployeeFormComponent },
    ]),
  ]
})
export class AdminAreaModule { }
