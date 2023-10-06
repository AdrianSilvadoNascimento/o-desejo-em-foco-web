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
import { HomeComponent } from './components/home/home.component'
import { RegisterItemComponent } from './components/register-item/register-item.component'
import { InfoItemComponent } from './components/info-item/info-item.component'
import { HeaderComponent } from './components/header/header.component';
import { InfoItemTemplateComponent } from './components/info-item-template/info-item-template.component';
import { MovementationsComponent } from './components/movementations/movementations.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterItemComponent,
    InfoItemComponent,
    HeaderComponent,
    InfoItemTemplateComponent,
    MovementationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
