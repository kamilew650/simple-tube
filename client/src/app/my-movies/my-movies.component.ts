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

  items = [];
  pageOfItems: Array<any>;

  step: number
  title: string
  description: string
  movies: Movie[]

  movieToEdit: Movie = null



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
    this.movieService.getNewForUser(this.loginService.loggedUser._id).then(res => {
      this.movies = res as Movie[]
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  clear() {
    this.title = null
    this.description = null
    this.file = null
    this.movieToEdit = null
  }

  closeModal(modal: any) {
    modal.close()
    this.clear()
  }

  openAddModal(content) {
    this.clear()
    this.step = 1
    this.open(content)
  }

  openEditModal(id: string, content) {
    this.clear()

    this.movieToEdit = this.movies.find(m => m._id.localeCompare(id) === 0)
    this.title = this.movieToEdit.title
    this.description = this.movieToEdit.description

    this.step = 2
    this.open(content)
  }

  openDetailModal(id: string, content) {
    this.clear()

    this.movieToEdit = this.movies.find(m => m._id.localeCompare(id) === 0)
    this.title = this.movieToEdit.title
    this.description = this.movieToEdit.description

    this.step = 3
    this.open(content)
  }

  addMovie() {
    if (!this.file) {
      return
    }

    this.movieService.add({
      description: this.description,
      title: this.title,
      file: this.file,
    }).then(res => {
      this.clear()
      this.modalService.dismissAll()
      this.movieService.getNew().then(res2 => {
        this.movies = res2 as Movie[]
      })
    }).catch(err => {
      console.log(err)
    })
  }

  editMovie() {
    this.movieToEdit.title = this.title
    this.movieToEdit.description = this.description
    this.movieService.update(this.movieToEdit).then(res => {
      const updatedMovie = res as Movie
      this.movies = this.movies.map(m => {
        if (m._id.localeCompare(updatedMovie._id) === 0) {
          return updatedMovie
        }
        return m
      })
      this.modalService.dismissAll()
      this.clear()
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

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
