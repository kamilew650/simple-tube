import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import Movie from '../models/Movie';
import { faCommentDots, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import User from '../models/User';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {


  faCommentDots = faCommentDots
  faEdit = faEdit
  faTrashAlt = faTrashAlt
  step: number
  title: string
  description: string
  movies: Movie[]
  user: User = null
  movie: Movie = null

  items = [];
  pageOfItems: Array<any>;

  file: any

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
  ) { }

  ngOnInit() {
    if (!this.loginService.isLoggedIn || (!this.loginService.loggedUser && this.loginService.loggedUser.role !== 1)) {
      this.router.navigateByUrl('/');
    }
    this.movieService.get().then(res => {
      this.movies = res as Movie[]
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openModal(id: string, content) {
    this.movie = this.movies.find(m => m._id.localeCompare(id) === 0)
    if (this.movie) {
      const user = this.movie.user as unknown as User
      this.userService.getOne(user._id).then(res => {
        this.user = res as User
        this.open(content)
      })
    }
  }

  deleteMovie(id: string) {
    this.movieService.delete(id).then(res => {
      this.movies = this.movies.filter(m => m._id.localeCompare(id) !== 0)
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
