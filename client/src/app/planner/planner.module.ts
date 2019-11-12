import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerComponent } from './planner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlannerRoutingModule } from './planner.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusStopComponent } from './bus-stop/bus-stop.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlannerComponent, NavbarComponent, BusStopComponent],
  imports: [
    CommonModule,
    PlannerRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class PlannerModule { }
