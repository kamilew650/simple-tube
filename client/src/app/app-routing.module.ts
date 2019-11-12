import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';
import { DriverModule } from './driver/driver.module';
import { PlannerModule } from './planner/planner.module';
import { SetterModule } from './setter/setter.module';
import { ManagerModule } from './manager/manager.module';

export function loadAdminModule() {
  return import('./admin/admin.module').then(mod => mod.AdminModule)
}

export function loadDriverModule() {
  return import('./driver/driver.module').then(mod => mod.DriverModule)
}

export function loadPlannerModule() {
  return import('./planner/planner.module').then(mod => mod.PlannerModule)
}

export function loadSetterModule() {
  return import('./setter/setter.module').then(mod => mod.SetterModule)
}

export function loadManagerModule() {
  return import('./manager/manager.module').then(mod => mod.ManagerModule)
}

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    loadChildren: loadAdminModule
  },
  {
    path: 'driver',
    loadChildren: loadDriverModule
  },
  {
    path: 'planner',
    loadChildren: loadPlannerModule
  },
  {
    path: 'setter',
    loadChildren: loadSetterModule

  },
  {
    path: 'manager',
    loadChildren: loadManagerModule
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
