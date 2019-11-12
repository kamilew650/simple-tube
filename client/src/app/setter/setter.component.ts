import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setter',
  templateUrl: './setter.component.html',
  styleUrls: ['./setter.component.css']
})
export class SetterComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (!this.loginService.token)
      this.router.navigate(["/"])
  }

}
