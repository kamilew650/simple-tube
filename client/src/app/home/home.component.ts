import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MovieService } from '../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import Movie from '../models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[]

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
  ) { }

  ngOnInit() {
    this.movieService.get().then(res => {
      this.movies = res as Movie[]
    })
  }

}
