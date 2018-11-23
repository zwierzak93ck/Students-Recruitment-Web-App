import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';
  userType;
  url = 'http://localhost:61318/';
  errorMessage = '';
  constructor(private _httpService: HttpService, private _authService: AuthService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.isUserLoggedIn();
  }

  authenticateUser() {
    const body = {
      Login: this.login,
      Password: this.password,
    };
    this._httpService.post('api/user/login', body).subscribe(result => {
      if (result === true) {
        this._authService.logIn().subscribe(() => {
          if (this._authService.isLoggedIn) {
            this.redirect();
          }
        });
      }
    if (result.value === 'Invalid email or password') {
      this.errorMessage = 'Niepoprawny e-mail lub hasło';
    }
    window.location.reload();
    });
  }

  isUserLoggedIn() {
    this._httpService.get('api/user/isAuthenticated').subscribe(result => {
      if (result === true) {
        this._authService.isLoggedIn = true;
        if (this._authService.isLoggedIn) {
          this.redirect();
        }
      }
    });
  }

  redirect() {
    let redirect;
    this._userService.getUserType().subscribe(result => {
      this._authService.userType = result;
      if (this._authService.userType === 0) {
        redirect = this._authService.redirectUrl ? this._authService.redirectUrl : 'candidateHome';
        this._router.navigate([redirect]);
      } else if (this._authService.userType === 1) {
        redirect = this._authService.redirectUrl ? this._authService.redirectUrl : 'recruiterHome';
        this._router.navigate([redirect]);
      }
    });
  }
}
