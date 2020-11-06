import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://tsiete.com.mx/librosRincon/';
  private key = 'AIzaSyBd3qewgoxNRHnbKGj8AWbGvd_OOYCUKXU';
  userToken: string;
  //crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient ) {
    //lee si existe algun token en la aplicacion
    this.leerToken();
   }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      localStorage.removeItem('expira');
  }

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
        //almacena el token si es que se realiza la operacion sin errores
        this.guardarToken( resp['idToken'] );
        localStorage.setItem('nombre', resp['nombre']);
        return resp;
      })
    );

  }

  //guarda en el navegador una cookie con el token de la sesion
  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    //validacion de la fecha del token 
    let hoy = new Date();
    //a la variable hoy se le suman 3600 segundos 
    hoy.setSeconds(3600);
    //guardamos la variable en una cookie llamada expira y lo convierte en string
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  leerToken() {
  
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    
    return this.userToken;
  }

  estaAutenticado(): boolean {
    //si el token no existe o es mayor a 2
    if ( this.userToken.length < 2 ) {
      return false;
    }
    
    //extraemos el token de la cookie para validar
    const expira = Number( localStorage.getItem('expira') );
    //creamos variable con fecha actual
    const expiraDate = new Date();
    //convierte a tiempo
    expiraDate.setTime( expira );
    
    //valida el tiempo a partir de token (preferente mente se debe de validar en el back con un registro de entrada y salida)
    if( expiraDate > new Date ){
      return true;
    }else{
      return false;
    }
  }

}
