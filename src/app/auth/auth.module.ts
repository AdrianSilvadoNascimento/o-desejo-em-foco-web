import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AngularMaterialModule } from '../angular-material.module'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FontAwesomeModule,
    RouterModule.forChild([
      { path: 'user-login', component: LoginComponent },
      { path: 'user-register', component: RegisterComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
