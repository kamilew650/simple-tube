import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Movie from '../models/Movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  movieId: string

  movie: Movie
  movieUrl: string

  constructor(private router: Router, private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
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

}
