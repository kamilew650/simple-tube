import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { CustomHttpService } from './services/custom-http.service';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent, NavbarComponent, HomeComponent, MyMoviesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService, CustomHttpService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
