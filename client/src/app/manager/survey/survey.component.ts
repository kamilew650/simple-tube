import { Component, OnInit } from '@angular/core';
import TechnicalReview from 'src/app/models/TechnicalReview';
import { TechnicalReviewService } from 'src/app/services/technicalReview.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private technicalReviewService: TechnicalReviewService, private modalService: NgbModal) { }

  reviews: TechnicalReview[]
  selectedTechnicalReview: TechnicalReview
  newTechnicalReview: TechnicalReview
  technicalReviewToEdit: TechnicalReview
  step: number

  ngOnInit() {
    this.initial()
  }

  initial() {
    this.technicalReviewService.get().then(reviews => {
      this.reviews = (reviews as any).map(el => {
        el.dueDate = new Date(el.dueDate)
        el.date = new Date(el.date)
        return el
      }) as TechnicalReview[]
    })
  }

  open(content) {
    this.newTechnicalReview = new TechnicalReview
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openAddModal(content) {
    this.step = 1
    this.open(content)
  }

  openEditModal(id: number, content) {
    this.step = 2
    this.technicalReviewToEdit = this.reviews.find(u => u.id == id)
    this.selectedTechnicalReview = { ...this.technicalReviewToEdit }
    this.open(content)
  }

  deleteTechnicalReview(id: number) {
    this.technicalReviewService.delete(id).then(res => {
      this.reviews = this.reviews.filter(u => u.id !== id)
    })
  }

  addTechnicalReview() {
    this.technicalReviewService.add(this.newTechnicalReview).then(res => {
      this.initial()
      this.modalService.dismissAll()
    })
  }

  editTechnicalReview() {
    delete (this.selectedTechnicalReview as any).vehicle
    this.technicalReviewService.update(this.selectedTechnicalReview.id, this.selectedTechnicalReview).then(res => {
      this.initial()
      this.modalService.dismissAll()
    })
  }

}
