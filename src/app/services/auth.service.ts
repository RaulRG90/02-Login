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

  constructor( private http: HttpClient) {
    // lee si existe algun token en la aplicacion
    this.leerToken();

   }

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
      "password": usuario.password,
      "returnSecureToken": true
    };

    return this.http.post(
      `${this.url}login.php`,authData
    ).pipe(
      map( resp => {
        console.log(resp);
        // almacena el token si es que se realiza la operacion sin errores
        this.guardarToken( resp['idToken'] );
        localStorage.setItem('nombre', resp['nombre']);
        return resp;
      })
    );

  }

  // guarda en el navegador una cookie con el token de la sesion
  // tslint:disable-next-line: typedef
  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    // validacion de la fecha del token 
    let hoy = new Date();
    // a la variable hoy se le suman 3600 segundos 
    hoy.setSeconds(3600);
    // guardamos la variable en una cookie llamada expira y lo convierte en string
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  // tslint:disable-next-line: typedef
  leerToken() {
  
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    
    return this.userToken;
  }

  estaAutenticado(): boolean {
    // si el token no existe o es mayor a 2
    if ( this.userToken.length < 2 ) {
      return false;
    }
    
    // extraemos el token de la cookie para validar
    const expira = Number( localStorage.getItem('expira') );
    // creamos variable con fecha actual
    const expiraDate = new Date();
    // convierte a tiempo
    expiraDate.setTime( expira );
    // valida el tiempo a partir de token (preferente mente se debe de validar en el back con un registro de entrada y salida)
    if( expiraDate > new Date ){
      return true;
    }else{
      return false;
    }
    
  }

  // hace la busqueda en mysql del token y el usuario, para verificar que este activo el mismo token
  // tslint:disable-next-line: typedef
  busquedadetoken(){
    // agrega los datos que se requieren para hacer la busqueda
    const tokenData = {
      "token": localStorage.getItem('token'),
      "usuario": localStorage.getItem('email')
    };
     console.log(tokenData);
    // ubicacion del php para buscar token
    return this.http.post(
      `${this.url}busquedaToken.php`, tokenData
    ).pipe(
      map( resp => {
        return resp;
      })
    );
  }
 
}
