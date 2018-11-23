import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpService: HttpService) { }

  getUserName(): Observable<any> {
    return this._httpService.get('api/user/name');
  }

  getUserType(): Observable<any> {
    return this._httpService.get('api/user/type');
  }

  checkData(): Observable<any> {
    return this._httpService.get('api/candidate/exist');
  }
}


