import { Component, OnInit } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Movie from '../models/Movie';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  faThumbsUp = faThumbsUp
  faThumbsDown = faThumbsDown

  searchString = null

  items = [];
  pageOfItems: Array<any>;

  movies: Movie[]

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchString = params.search;
      this.movieService.findByWord(this.searchString).then(res => {
        this.movies = res as Movie[]
      })
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
