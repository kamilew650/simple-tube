import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MovieService } from '../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import Movie from '../models/Movie';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("content", { static: true }) content: ElementRef;

  faThumbsUp = faThumbsUp
  faThumbsDown = faThumbsDown

  activeToken

  items = [];
  pageOfItems: Array<any>;

  movies: Movie[]

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.activeToken = params.activeToken;

      if (this.activeToken) {
        this.userService.activeAccount(this.activeToken).then(() => {
        })
        console.log(this.content)
        this.open(this.content)
      }

      this.movieService.getNew().then(res => {
        this.movies = res as Movie[]
      })
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  closeModal(modal: any) {
    modal.close()
  }
}
