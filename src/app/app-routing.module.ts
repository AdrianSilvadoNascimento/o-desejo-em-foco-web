import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { InfoItemComponent } from './components/info-item/info-item.component'
import { RegisterItemComponent } from './components/register-item/register-item.component'
import { MovementationsComponent } from './components/movementations/movementations.component'
import { ClientComponent } from './components/client-list/client-list.component'
import { ClientInfoTemplateComponent } from './components/client-form/client-form.component'
import { InfoClientComponent } from './components/info-client/info-client.component'

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'info-item/:id', component: InfoItemComponent },
  { path: 'account', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register-item', component: RegisterItemComponent },
  { path: 'edit-item/:id', component: RegisterItemComponent },
  { path: 'register-item/:barcode', component: RegisterItemComponent },
  { path: 'movementations', component: MovementationsComponent },
  { path: 'movementation/:id', component: MovementationsComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'client/:id', component: ClientComponent },
  { path: 'info-client/:id', component: InfoClientComponent },
  { path: 'edit-client/:id', component: ClientInfoTemplateComponent },
  { path: 'register-client', component: ClientInfoTemplateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
