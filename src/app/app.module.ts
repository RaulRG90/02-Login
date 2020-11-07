import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from "@angular/common/http";
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { LibroMesComponent } from './pages/libro-mes/libro-mes.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NoticiasComponent,
    LibroMesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
