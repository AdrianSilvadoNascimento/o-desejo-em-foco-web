import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AuthModule } from './auth/auth.module'
import { AngularMaterialModule } from './angular-material.module'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component'
import { ClientInfoTemplateComponent } from './components/client-form/client-form.component'
import { ClientComponent } from './components/client-list/client-list.component'
import { InfoItemComponent } from './components/info-item/info-item.component'
import { InfoItemTemplateComponent } from './components/info-item-template/info-item-template.component'
import { HeaderComponent } from './components/header/header.component'
import { MovementationsComponent } from './components/movementations/movementations.component'
import { InfoClientComponent } from './components/info-client/info-client.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterItemComponent } from './components/register-item/register-item.component'

@NgModule({
  declarations: [
    AppComponent,
    InfoClientComponent,
    ClientInfoTemplateComponent,
    ClientComponent,
    InfoItemComponent,
    InfoItemTemplateComponent,
    HeaderComponent,
    HomeComponent,
    MovementationsComponent,
    RegisterItemComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
