import { Component, OnInit } from '@angular/core';
import Vehicle from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vahicle',
  templateUrl: './vahicle.component.html',
  styleUrls: ['./vahicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private modalService: NgbModal) { }

  vehicles: Vehicle[]
  selectedVehicle: Vehicle
  newVehicle: Vehicle
  vehicleToEdit: Vehicle
  step: number

  ngOnInit() {
    this.vehicleService.get().then(vehicles => {
      this.vehicles = vehicles as Vehicle[]
      this.vehicles = this.vehicles.map(v => {
        v.purchaseDate = new Date(v.purchaseDate)
        v.yearOfProduction = new Date(v.yearOfProduction)
        return v
      })
    })
  }

  initial() {
    this.vehicleService.get().then(vehicles => {
      console.log(vehicles)
      this.vehicles = vehicles as Vehicle[]
      this.vehicles = this.vehicles.map(v => {
        v.purchaseDate = new Date(v.purchaseDate)
        v.yearOfProduction = new Date(v.yearOfProduction)
        return v
      })
    })
  }

  open(content) {
    this.newVehicle = new Vehicle
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openAddModal(content) {
    this.step = 1
    this.open(content)
  }

  openEditModal(id: number, content) {
    this.step = 2
    this.vehicleToEdit = this.vehicles.find(u => u.id == id)
    this.selectedVehicle = { ...this.vehicleToEdit }
    this.open(content)
  }

  deleteVehicle(id: number) {
    this.vehicleService.delete(id).then(res => {
      this.vehicles = this.vehicles.filter(u => u.id !== id)
    })
  }

  addVehicle() {
    if (typeof (this.newVehicle.yearOfProduction) === typeof (1))
      this.newVehicle.yearOfProduction = `${this.newVehicle.yearOfProduction}-01-01` as unknown as Date

    this.vehicleService.add(this.newVehicle).then(res => {
      this.initial()
      this.modalService.dismissAll()
    })
  }

  editVehicle() {
    console.log(typeof (this.selectedVehicle.yearOfProduction))
    if (typeof (this.selectedVehicle.yearOfProduction) === typeof (1))
      this.selectedVehicle.yearOfProduction = `${this.selectedVehicle.yearOfProduction}-01-01` as unknown as Date

    this.vehicleService.update(this.selectedVehicle.id, this.selectedVehicle).then(res => {
      this.initial()
      this.modalService.dismissAll()
    })
  }
}
