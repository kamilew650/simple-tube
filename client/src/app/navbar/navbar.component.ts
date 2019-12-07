import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false
  user

  constructor(private loginService: LoginService, private router: Router, private activeRoute: ActivatedRoute) {
    router.events.subscribe((val) => {
      this.ngOnInit()
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn
    this.user = this.loginService.loggedUser
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/login'])
    this.isLoggedIn = false
    this.user = null
  }

  logIn() {
    this.router.navigate(['/login'])
  }
}
