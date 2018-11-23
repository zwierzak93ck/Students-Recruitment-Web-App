import { Injectable } from '@angular/core';
import { FormControl, FormArray } from '../../../node_modules/@angular/forms';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isValid = false;
  checkValidation(formControls: FormArray) {
    return formControls.valid;
  }
}
