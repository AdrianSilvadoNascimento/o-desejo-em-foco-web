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
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryComponent } from './category/category.component';
import { PixViewComponent } from './pix-view/pix-view.component';

@NgModule({
  declarations: [
    IndexComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    CategoryFormComponent,
    CategoryComponent,
    PixViewComponent,
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
      { path: 'register-category', component: CategoryFormComponent },
      { path: 'update-category/:id', component: CategoryFormComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'pix-payment', component: PixViewComponent },
    ]),
  ]
})
export class AdminAreaModule { }
