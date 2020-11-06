import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string;
  constructor( private auth: AuthService,
              private router: Router  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('nombre');
  }
  
  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
