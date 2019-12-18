import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Movie from '../models/Movie';
import { MovieService } from '../services/movie.service';
import { LoginService } from '../services/login.service';
import User from '../models/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import Comment from '../models/Comment';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  faThumbsUp = faThumbsUp
  faThumbsDown = faThumbsDown

  items = [];
  pageOfItems: Array<any>;

  user: User = null
  isLoggedIn = false
  movieId: string

  step: number = null

  comments: Comment[]
  comment: Comment = null
  content: string = null
  contentText: string = null

  movie: Movie
  movieUrl: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn
    if (this.isLoggedIn) {
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
        this.commentService.get(this.movie._id).then(res => {
          this.comments = res as Comment[]
        })
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

  openAddModal(content) {
    this.clear()

    this.step = 1
    this.open(content)
  }

  openEditModal(id: string, content) {
    this.clear()

    this.comment = this.comments.find(c => c._id.localeCompare(id) === 0)

    this.contentText = this.comment.content

    this.step = 2
    this.open(content)
  }

  addComment() {
    this.commentService.add({
      content: this.contentText,
      movieId: this.movie._id,
    }).then(res => {
      console.log(res)
      this.clear()
      this.comments.unshift(res as Comment)
      this.modalService.dismissAll()
    }).catch(err => {
      console.log(err)
    })
  }

  editComment() {
    const commentToEdit = { ...(this.comment) } as Comment

    commentToEdit.content = this.contentText

    this.commentService.update(commentToEdit).then(res => {
      const updatedComment = res as Comment
      this.clear()
      this.comments = this.comments.map(c => c._id.localeCompare(updatedComment._id) === 0 ? updatedComment : c)
      this.modalService.dismissAll()
    }).catch(err => {
      console.log(err)
    })
  }

  delete(id: string) {
    this.commentService.delete(id).then(() => {
      this.comments = this.comments.filter(c => c._id.localeCompare(id) !== 0)
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
