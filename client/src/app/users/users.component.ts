import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import User from 'src/app/models/User';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { RoleEnum } from 'src/app/models/RoleEnum';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  faTrashAlt = faTrashAlt
  user: User

  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.loginService.loggedUser
    console.log(this.user)
    if (this.user.role !== 0) {
      this.router.navigateByUrl('/')
    }
    this.userService.get().then(users => {
      this.users = users as User[]
    })
  }

  users: User[]

  closeResult: string;



  deleteUser(id: string) {
    this.userService.delete(id).then(res => {
      this.users = this.users.filter(u => u._id !== id)
    })
  }

  getRoleName(role: RoleEnum) {
    switch (role) {
      case 0:
        return 'Administrator'
        break
      case 1:
        return 'Użytkownik'
      default:
        return ''
    }
  }

}
