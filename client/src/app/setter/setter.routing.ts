import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetterComponent } from './setter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusStopComponent } from '../planner/bus-stop/bus-stop.component';


export const routes: Routes = [
  {
    path: '',
    component: SetterComponent,
    data: {
      breadcrumb: [null]
    },
    children: [
      {
        path: '',
        component: NavbarComponent
      }
    ],
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetterRoutingModule { }
