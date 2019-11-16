import { NgModule } from "@angular/core";
import { Routes, RouterModule, LoadChildren } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminModule } from "./admin/admin.module";

export function loadAdminModule() {
  return import("./admin/admin.module").then(mod => mod.AdminModule);
}

export const routes: Routes = [
  {
    path: "main",
    component: HomeComponent
  },
  {
    path: "login",
    component: HomeComponent
  },
  {
    path: "admin",
    loadChildren: loadAdminModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
