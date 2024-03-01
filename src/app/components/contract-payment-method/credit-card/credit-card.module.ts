import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularMaterialModule } from '../../../angular-material.module';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  declarations: [CreditCardComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FontAwesomeModule,
    NgOptimizedImage,
    RouterModule.forChild([{ path: 'plan/:id', component: CreditCardComponent }]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class CreditCardModule {}
