import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  esverdad: boolean = false;
  resp = {};
  constructor(private auth: AuthService,
              private router: Router){}
  //este se ejecuta cuando entra a las paginas protegida, esta en app-routing-module.ts
  canActivate(): boolean {
  //console.log('Guard');
  if( localStorage.getItem('token') && localStorage.getItem('email') ){
    this.esverdad = this.otracosa();
    if( this.esverdad ){
      return true;
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      localStorage.removeItem('email');
      localStorage.removeItem('recordarme');
      this.router.navigateByUrl('/login');
      return false;
    }

  }else{
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('recordarme');
    this.router.navigateByUrl('/login');
    return false;
  }

  }

  otracosa(): boolean{
    this.auth.busquedadetoken().subscribe(
      data => {
        this.resp = data;
      },(err) => {
        this.resp = false;
      });
    if( this.resp ){
        return true;
      }else{
        return false;
      }
  }
  
  
}
