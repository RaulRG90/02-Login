import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { LibroMesComponent } from './pages/libro-mes/libro-mes.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent , canActivate: [ AuthGuard ] },
  { path: 'noticias'    , component: NoticiasComponent , canActivate: [ AuthGuard ] },
  { path: 'libros'    , component: LibroMesComponent , canActivate: [ AuthGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
