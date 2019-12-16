import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Movie from '../models/Movie';
import { MovieService } from '../services/movie.service';
import { LoginService } from '../services/login.service';
import User from '../models/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  user: User = null
  isLogedIn = false
  movieId: string

  step: number = null

  comment: Comment = null
  content: string = null

  movie: Movie
  movieUrl: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loginService: LoginService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.isLogedIn = this.loginService.isLoggedIn
    if (this.isLogedIn) {
      this.user = this.loginService.loggedUser
    }

    this.route.params.subscribe(params => {
      this.movieId = params['id']

      if (!this.movieId) {
        this.router.navigateByUrl('/')
      }

      this.movieService.getOne(this.movieId).then(res => {
        this.movie = res as Movie
        this.movieUrl = `https://simpletube.s3.eu-central-1.amazonaws.com/${this.movie.videoToken}`
      })
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  clear() {
    this.comment = null
    this.content = null
  }

  closeModal(modal: any) {
    modal.close()
    this.clear()
  }

  openEditModal(id: string, content) {
    this.clear()

    // this.movieToEdit = this.movies.find(m => m._id.localeCompare(id) === 0)
    // this.title = this.movieToEdit.title
    // this.description = this.movieToEdit.description

    this.step = 2
    this.open(content)
  }

  openDetailModal(id: string, content) {
    this.clear()

    // this.movieToEdit = this.movies.find(m => m._id.localeCompare(id) === 0)
    // this.title = this.movieToEdit.title
    // this.description = this.movieToEdit.description

    this.step = 3
    this.open(content)
  }

  addMovie() {
    // if (!this.file) {
    //   return
    // }

    // this.movieService.add({
    //   description: this.description,
    //   title: this.title,
    //   file: this.file,
    // }).then(res => {
    //   this.clear()
    //   this.modalService.dismissAll()
    //   this.movies.push(res as Movie)
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  editMovie() {
    // this.movieToEdit.title = this.title
    // this.movieToEdit.description = this.description
    // this.movieService.update(this.movieToEdit).then(res => {
    //   const updatedMovie = res as Movie
    //   this.movies = this.movies.map(m => {
    //     if (m._id.localeCompare(updatedMovie._id) === 0) {
    //       return updatedMovie
    //     }
    //     return m
    //   })
    //   this.modalService.dismissAll()
    //   this.clear()
    // })
  }

}
