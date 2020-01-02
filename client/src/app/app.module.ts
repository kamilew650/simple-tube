import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { CustomHttpService } from './services/custom-http.service';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { MovieService } from './services/movie.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayerComponent } from './player/player.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './services/user.service';
import { MoviesComponent } from './movies/movies.component';
import { CommentService } from './services/comment.service';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ResultsComponent } from './results/results.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    HomeComponent,
    MyMoviesComponent,
    PlayerComponent,
    UsersComponent,
    MoviesComponent,
    JwPaginationComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [LoginService, CustomHttpService, CookieService, MovieService, UserService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
