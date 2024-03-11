import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { InfoItemComponent } from './components/info-item/info-item.component';
import { RegisterItemComponent } from './components/register-item/register-item.component';
import { MovementationsComponent } from './components/movementations/movementations.component';
import { ClientComponent } from './components/client-list/client-list.component';
import { ClientInfoTemplateComponent } from './components/client-form/client-form.component';
import { InfoClientComponent } from './components/info-client/info-client.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './components/admin-area/admin.guard';
import { ContractPaymentMethodComponent } from './components/contract-payment-method/contract-payment-method.component';
import { SubscriptionGuard } from './subscriptions.guard';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { RegisterAddressGuard } from './components/user-address/register-address.guard';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: HomeComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'info-item/:id',
    component: InfoItemComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin-area/admin-area.module').then(
        (m) => m.AdminAreaModule
      ),
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard, AdminGuard],
  },
  {
    path: 'register-item',
    component: RegisterItemComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'edit-item/:id',
    component: RegisterItemComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'register-item/:barcode',
    component: RegisterItemComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'movementations',
    component: MovementationsComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'movementation/:id',
    component: MovementationsComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'clients',
    component: ClientComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'client/:id',
    component: ClientComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'info-client/:id',
    component: InfoClientComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'edit-client/:id',
    component: ClientInfoTemplateComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'register-client',
    component: ClientInfoTemplateComponent,
    canActivate: [AuthGuard, SubscriptionGuard, RegisterAddressGuard],
  },
  {
    path: 'contract-subscription',
    component: ContractPaymentMethodComponent,
    canActivate: [AuthGuard, RegisterAddressGuard],
  },
  {
    path: 'register-address',
    component: UserAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contract',
    loadChildren: () =>
      import(
        './components/contract-payment-method/credit-card/credit-card.module'
      ).then((m) => m.CreditCardModule),
    canActivate: [AuthGuard, AdminGuard, RegisterAddressGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
