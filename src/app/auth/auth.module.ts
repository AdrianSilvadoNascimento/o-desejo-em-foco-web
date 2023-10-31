import { InjectionToken, NgModule } from '@angular/core'
import { CommonModule, ImageLoaderConfig } from '@angular/common'
import { NgOptimizedImage } from '@angular/common'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AngularMaterialModule } from '../angular-material.module'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

const IMAGE_CONFIG: InjectionToken<ImageLoaderConfig> = new InjectionToken<ImageLoaderConfig>('')

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FontAwesomeModule,
    NgOptimizedImage,
    RouterModule.forChild([
      { path: 'user-login', component: LoginComponent },
      { path: 'user-register', component: RegisterComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
      }
    },
  ],
})
export class AuthModule {}
