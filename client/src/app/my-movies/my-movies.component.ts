import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import Movie from '../models/Movie';
import { faCommentDots, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {

  faCommentDots = faCommentDots
  faEdit = faEdit
  faTrashAlt = faTrashAlt
  step: number
  title: string
  description: string
  movies: Movie[]

  file: any

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
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

  openAddModal(content) {
    this.step = 1
    this.open(content)
  }

  openEditModal(id: number, content) {
    this.step = 2
    this.open(content)
  }

  addMovie() {
    console.log(this.file)
    this.movieService.add({
      description: this.description,
      title: this.title,
      file: this.file,
    }).then(res => {
      console.log(res)
      this.modalService.dismissAll()
      this.movies.push(res as Movie)
    }).catch(err => {
      console.log(err)
    })
  }


  fileChanged($event) {
    const files = $event.target.files
    const file = files[0] ? files[0] : null

    this.file = file
  }

  deleteMovie(id: string) {
    this.movieService.delete(id).then(res => {
      this.movies = this.movies.filter(m => m._id.localeCompare(id) !== 0)
    })
  }
}
