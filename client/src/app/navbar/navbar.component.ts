import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild("search", { static: false }) search: ElementRef;

  isLoggedIn = false
  user

  constructor(private loginService: LoginService, private router: Router, private activeRoute: ActivatedRoute, private renderer: Renderer) {
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
    this.isLoggedIn = false
    this.user = null
    this.router.navigate(['/login'])
  }

  logIn() {
    this.router.navigate(['/login'])
  }

  findMovie(searchInput: HTMLInputElement) {
    const searchString: string = this.search.nativeElement.value

    if (searchString && searchString.length !== 0) {
      this.router.navigate([`results`], { queryParams: { search: searchString } }).then(() => {
        this.search.nativeElement.value = ''
      })
    }
  }
}
