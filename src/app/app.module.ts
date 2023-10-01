import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'

import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterItemComponent } from './components/register-item/register-item.component'
import { InfoItemComponent } from './components/info-item/info-item.component'
import { HeaderComponent } from './components/header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterItemComponent,
    InfoItemComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
