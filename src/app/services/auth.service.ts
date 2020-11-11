import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { map } from "rxjs/operators";





@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private url = 'https://tsiete.com.mx/librosRincon/';
  //private url = 'http://localhost/librosRincon/';

  userToken: string;
  verToken: string;

  constructor( private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      localStorage.removeItem('expira');
  }

  // tslint:disable-next-line: typedef
  login( usuario: UsuarioModel){
    
    const authData = {
      "email": usuario.email,
      "password": usuario.password
    };
    
    return this.http.post(
      `${this.url}login.php`,authData
    ).pipe(
      map( resp => {
        //console.log(resp);
        // almacena el token si es que se realiza la operacion sin errores
        this.guardarToken( resp['idToken'], resp['nombre'], resp['email']);
        
        return resp;
      })
    );

  }

  // guarda en el navegador una cookie con el token de la sesion
  // tslint:disable-next-line: typedef
  private guardarToken( idToken: string, nombre: string, email: string ){
    localStorage.setItem('token', idToken);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);
  }

  // hace la busqueda en mysql del token y el usuario, para verificar que este activo el mismo token
  // tslint:disable-next-line: typedef
  busquedadetoken(){
    // agrega los datos que se requieren para hacer la busqueda
    const tokenData = {
      "token": localStorage.getItem('token'),
      "usuario": localStorage.getItem('email')
    };
    // ubicacion del php para buscar token
    return this.http.post(
      `${this.url}busquedaToken.php`, tokenData
    );
  }
}
