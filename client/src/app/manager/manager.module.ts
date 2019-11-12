import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManagerRoutingModule } from './manager.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SurveyComponent } from './survey/survey.component';
import { FailureComponent } from './failure/failure.component';
import { VehicleComponent } from './vahicle/vahicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManagerComponent, NavbarComponent, SurveyComponent, FailureComponent, VehicleComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManagerModule { }
