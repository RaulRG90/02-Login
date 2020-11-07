import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router){}
  //este se ejecuta cuando entra a las paginas protegida, esta en app-routing-module.ts
  canActivate(): boolean {
    //console.log('Guard');

    if ( this.auth.estaAutenticado() ) {
      return true ;
      
    } else {
      this.router.navigateByUrl('/login');
      return false;
      
    }
  }
  
}
