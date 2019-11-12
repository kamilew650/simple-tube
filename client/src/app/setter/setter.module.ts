import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetterComponent } from './setter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetterRoutingModule } from './setter.routing';

@NgModule({
  declarations: [SetterComponent, NavbarComponent],
  imports: [
    CommonModule,
    SetterRoutingModule,
    NgbModule
  ]
})
export class SetterModule { }
