import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;
  
  constructor( private auth: AuthService,
                private router:Router ) { }

  ngOnInit() {
    //inicializa modelo /models/usuario.models.ts
    this.usuario = new UsuarioModel();

    //recuerda bandera de check y email
    if( localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }
  onLogin( form: NgForm ){

    if (form.invalid) {return;}
    
    //manda a llamar el sweetalert2
    Swal.fire({
      //restringe al usuario a salir
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    //ejecuta una ventana de loading
    Swal.showLoading();


    this.auth.login( this.usuario ).
    subscribe( resp => {
      //console.log(resp);
      //cancela swealert2 loading
      Swal.close();
      
      //redirecciona a home si los datos son correctos
      this.router.navigateByUrl('/home');

      //si la bandera del check esta en true se aplica el localstorage
      if ( this.recordarme ) {
        localStorage.setItem( 'email', this.usuario.email );
      }

    }, (err) => {
      console.log(err);
      //manda a llamar el sweetalert2
      Swal.fire({
        //restringe al usuario a salir
        title: 'Error al autenticar',
        icon: 'error',
        //text: err.error.text
      });
      
    });
    
  }

}
