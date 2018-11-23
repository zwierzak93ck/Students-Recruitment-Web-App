import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor() { }

  private _tableType: BehaviorSubject<Number> = new BehaviorSubject(0);
  private _refresh: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public readonly tableType: Observable<Number> = this._tableType.asObservable();
  public readonly refresh: Observable<Boolean> = this._refresh.asObservable();

  setTableType(type: Number) {
    this._tableType.next(type);
  }

  refreshTable() {
    this._refresh.next(true);
  }
}
