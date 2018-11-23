import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { CandidateService } from './candidate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _userService: UserService, private _candidateService: CandidateService) { }

  isLoggedIn = false;
  userType;
  isDataAdded;
  userName;
  status;
  groupName;
  photo;
  redirectUrl: string;

  logIn(): Observable<boolean> {
      this.getUserType();
      return of(true).pipe(
        delay(1000),
        tap(val => {
          this.isLoggedIn = true;
        })
      );
  }

  logOut(): void {
    this.userType = undefined;
    this.isDataAdded = undefined;
    this.photo = undefined;
    this.isLoggedIn = false;
    this.redirectUrl = '/login';
  }

  getUserType() {
    this._userService.getUserType().subscribe(result => {
      this.userType = result;
    });
  }

  checkData() {
    this._userService.checkData().subscribe(result => {
      this.isDataAdded = result;
    });
  }

  getPhoto() {
    this._candidateService.getPhoto().subscribe(result => {
      this.photo = result;
    });
  }

  getUserName() {
    this._userService.getUserName().subscribe(result => {
      this.userName = result;
    });
  }

  getStatus() {
    this._candidateService.getStatus().subscribe(result => {
      switch (result) {
        case 0: {
          this.status = 'Przyjęty';
          break;
        }

        case 1: {
          this.status = 'Odrzucony';
          break;
        }

        case 2: {
          this.status = 'W trakcie rekrutacji';
          break;
        }

        default:
          break;
      }
    });
  }

  getGroupName() {
    this._candidateService.getGroupName().subscribe(result => {
      this.groupName = result.value;
    });
  }
}
