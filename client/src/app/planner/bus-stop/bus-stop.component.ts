import { Component, OnInit } from '@angular/core';
import { BusStopService } from 'src/app/services/busStop.service';
import BusStop from 'src/app/models/BusStop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bus-stop',
  templateUrl: './bus-stop.component.html',
  styleUrls: ['./bus-stop.component.css']
})
export class BusStopComponent implements OnInit {

  busStops: BusStop[]
  selectedBusStop: BusStop
  newBusStop: BusStop
  busStopToEdit: BusStop
  step


  constructor(
    private busStopService: BusStopService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.initial()
  }

  initial() {
    this.busStopService.get().then(res => {
      this.busStops = res as BusStop[]
    })
  }

  open(content) {
    this.newBusStop = new BusStop()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openAddModal(content) {
    this.step = 1
    this.open(content)
  }

  openEditModal(id: number, content) {
    this.step = 2
    this.busStopToEdit = this.busStops.find(u => u.id == id)
    this.selectedBusStop = { ...this.busStopToEdit }
    this.open(content)
  }

  deleteBusStop(id: number) {
    this.busStopService.delete(id).then(res => {
      this.busStops = this.busStops.filter(u => u.id !== id)
    })
  }

  addBusStop() {
    this.busStopService.add(this.newBusStop).then(res => {
      this.initial()
      this.modalService.dismissAll()
    })
  }

  editBusStop() {
    this.busStopService.update(this.selectedBusStop.id, this.selectedBusStop).then(res => {
      this.initial()
      this.modalService.dismissAll()
    })
  }

}
