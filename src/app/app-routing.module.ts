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

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'info-item/:id', component: InfoItemComponent, canActivate: [ AuthGuard ] },
  { path: 'account', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register-item', component: RegisterItemComponent, canActivate: [ AuthGuard ] },
  { path: 'edit-item/:id', component: RegisterItemComponent, canActivate: [ AuthGuard ] },
  { path: 'register-item/:barcode', component: RegisterItemComponent, canActivate: [ AuthGuard ] },
  { path: 'movementations', component: MovementationsComponent, canActivate: [ AuthGuard ] },
  { path: 'movementation/:id', component: MovementationsComponent, canActivate: [ AuthGuard ] },
  { path: 'clients', component: ClientComponent, canActivate: [ AuthGuard ] },
  { path: 'client/:id', component: ClientComponent, canActivate: [ AuthGuard ] },
  { path: 'info-client/:id', component: InfoClientComponent, canActivate: [ AuthGuard ] },
  { path: 'edit-client/:id', component: ClientInfoTemplateComponent, canActivate: [ AuthGuard ] },
  { path: 'register-client', component: ClientInfoTemplateComponent, canActivate: [ AuthGuard ] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
