import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';

import {VOIVODESHIPS, NATIONALITIES, TYPESOFTOWN} from '../../../shared/consts';
import { CandidateService } from '../../../services/candidate.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-registered-address',
  templateUrl: './registered-address.component.html',
  styleUrls: ['./registered-address.component.css']
})
export class RegisteredAddressComponent implements OnInit {

  @Output() registeredAddressValid = new EventEmitter();
  @Input() registeredAddressBodyConfirmed: Boolean;

  country = '';
  street = '';
  postalCode = '';
  voivodeship = '';
  voivodeships = VOIVODESHIPS;
  nationalities = NATIONALITIES;
  typesOfTown = TYPESOFTOWN;
  houseNumber = '';
  typeOfTown = '';
  city = '';
  apartmentNumber = '';
  postOffice = '';

  namePattern = '[A-ZĄĆĘŁŃÓŚŹŻ]{1}[a-ząćęłńóśźż]{1,32}';
  isFormValid = false;

  countryControl = new FormControl('', []);
  streetControl = new FormControl('', []);
  postalCodeControl = new FormControl('', []);
  voivodeshipControl = new FormControl('', []);
  houseNumberControl = new FormControl('', []);
  typeOfTownControl = new FormControl('', []);
  cityControl = new FormControl('', []);
  apartmentNumberControl = new FormControl('', []);
  postOfficeControl = new FormControl('', []);
  controls = new Array<FormControl>();

  constructor(private _candidateService: CandidateService, private _validationService: ValidationService) { }

  ngOnInit() {}

  checkValidation() {
    this._candidateService.setRegisteredAddressBody(this.country, this.city, this.street, this.postalCode, this.voivodeship,
      this.houseNumber, this.apartmentNumber, this.typeOfTown, this.postOffice );

      if (this.country === 'Polska') {
        this.controls.push(this.countryControl, this.streetControl, this.postalCodeControl
                   , this.voivodeshipControl, this.houseNumberControl, this.typeOfTownControl
                   , this.cityControl, this.apartmentNumberControl, this.postOfficeControl);
                    this.registeredAddressValid.emit(this._validationService.checkValidation(new FormArray(this.controls)));
      } else if (this.country !== 'Polska') {

      this.controls.push(this.countryControl, this.streetControl, this.postalCodeControl,
                        this.houseNumberControl, this.typeOfTownControl, this.cityControl,
                        this.apartmentNumberControl, this.postOfficeControl);
                    this.registeredAddressValid.emit(this._validationService.checkValidation(new FormArray(this.controls)));
      }
  }
}
