import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { InfoItemComponent } from './components/info-item/info-item.component'
import { RegisterItemComponent } from './components/register-item/register-item.component'
import { MovementationsComponent } from './components/movementations/movementations.component'
import { ClientComponent } from './components/client-list/client-list.component'
import { ClientInfoTemplateComponent } from './components/client-form/client-form.component'
import { InfoClientComponent } from './components/info-client/info-client.component'
import { AuthGuard } from './auth/auth.guard'
import { AdminGuard } from './components/admin-area/admin.guard'
import { ContractPaymentMethodComponent } from './components/contract-payment-method/contract-payment-method.component'
import { SubscriptionGuard } from './subscriptions.guard'

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'info-item/:id', component: InfoItemComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'account', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./components/admin-area/admin-area.module').then(m => m.AdminAreaModule), canActivate: [AuthGuard, SubscriptionGuard, AdminGuard] },
  { path: 'register-item', component: RegisterItemComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'edit-item/:id', component: RegisterItemComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'register-item/:barcode', component: RegisterItemComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'movementations', component: MovementationsComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'movementation/:id', component: MovementationsComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'clients', component: ClientComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'client/:id', component: ClientComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'info-client/:id', component: InfoClientComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'edit-client/:id', component: ClientInfoTemplateComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'register-client', component: ClientInfoTemplateComponent, canActivate: [ AuthGuard, SubscriptionGuard ] },
  { path: 'contract-subscription', component: ContractPaymentMethodComponent, canActivate: [ AuthGuard ] },
  { path: 'contract', loadChildren: () => import('./components/contract-payment-method/credit-card/credit-card.module').then(m => m.CreditCardModule), canActivate: [AuthGuard, AdminGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
