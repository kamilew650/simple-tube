import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false
  user

  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn
    this.user = this.loginService.loggedUser
    console.log(this.user)
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/login'])
  }

  logIn() {
    this.router.navigate(['/login'])
  }
}
