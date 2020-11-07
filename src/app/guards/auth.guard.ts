import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  valoy: boolean = false;

  constructor(private auth: AuthService,
              private router: Router){}
  //este se ejecuta cuando entra a las paginas protegida, esta en app-routing-module.ts
  canActivate(): boolean {
    //console.log('Guard');

    this.auth.busquedadetoken().
    subscribe(data => {
      this.valoy = true;
    });

    if ( this.auth.estaAutenticado() ) {
      if ( this.valoy ) {
        console.log('true guard busqueda');
        return true ;
      } else {
        console.log('false guard busqueda');
        this.router.navigateByUrl('/login');
        return false;
      }
    }
    if( !this.auth.estaAutenticado() ){
      console.log('false guard esta autenticado');
      this.router.navigateByUrl('/login');
      return false;
      
    }
  }
}
