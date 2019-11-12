import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DriverRoutingModule } from './driver.routing';
import { DriverComponent } from './driver.component';

@NgModule({
  declarations: [NavbarComponent, DriverComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
    NgbModule
  ]
})
export class DriverModule { }
