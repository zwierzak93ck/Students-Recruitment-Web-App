import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import {HttpService} from '../../services/http.service';
import {VOIVODESHIPS, GENDERS, NATIONALITIES, TYPESOFTOWN} from '../../shared/consts';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-edit-candidate-data',
  templateUrl: './edit-candidate-data.component.html',
  styleUrls: ['./edit-candidate-data.component.css']
})
export class EditCandidateDataComponent implements OnInit {

  valid: Boolean;
  firstName = '';
  secondName = '';
  lastName = '';
  familyName = '';
  pesel = '';
  selectedGender = '';
  birthdate = '';
  nationality = '';
  motherName = '';
  fatherName = '';
  identityDocument = '';
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

  isFormValid = false;

  public genders = GENDERS;

  namePattern = '[A-Z]{1}[a-z]{1,32}';

  peselControl = new FormControl('', []);
  firstNameControl = new FormControl('', []);
  lastNameControl = new FormControl('', []);
  motherNameControl = new FormControl('', []);
  fatherNameControl = new FormControl('', []);
  nationalityControl = new FormControl('', []);
  genderControl = new FormControl('', []);
  birthdateControl = new FormControl('', []);
  familyNameControl = new FormControl('', []);
  secondNameControl = new FormControl('', []);
  identityDocumentControl = new FormControl('', []);
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

  constructor(private _httpService: HttpService, private _validationService: ValidationService, public snackbar: MatSnackBar) { }

  ngOnInit() {
    this._httpService.get('/api/candidate/candidate').subscribe(receivedData => {
      this.firstName = receivedData.candidate[0].firstName;
      this.secondName = receivedData.candidate[0].secondName;
      this.lastName = receivedData.candidate[0].lastName;
      this.pesel = receivedData.candidate[0].pesel;
      this.motherName = receivedData.candidate[0].motherName;
      this.fatherName = receivedData.candidate[0].fatherName;
      this.familyName = receivedData.candidate[0].familyName;
      this.birthdate = receivedData.candidate[0].birthdate;
      this.nationality = receivedData.candidate[0].nationality;
      this.selectedGender = receivedData.candidate[0].gender;

      this.country = receivedData.address[0].country;
      this.voivodeship = receivedData.address[0].voivodeship;
      this.city = receivedData.address[0].city;
      this.street = receivedData.address[0].street;
      this.houseNumber = receivedData.address[0].houseNumber;
      this.apartmentNumber = receivedData.address[0].apartmentNumber;
      this.postalCode = receivedData.address[0].postalCode;
      this.postOffice = receivedData.address[0].postOffice;
      this.typeOfTown = receivedData.address[0].typeOfTown;
    }
    );
  }

  updateData() {
    const body = {
      FirstName: this.firstName,
      SecondName: this.secondName,
      LastName: this.lastName,
      FamilyName: this.familyName,
      Pesel: this.pesel,
      Gender: this.selectedGender,
      BirthDate: this.birthdate,
      Nationality: this.nationality,
      MotherName: this.motherName,
      FatherName: this.fatherName,

      Country: this.country,
      Street: this.street,
      PostalCode: this.postalCode,
      Voivodeship: this.voivodeship,
      HouseNumber: this.houseNumber,
      TypeOfTown: this.typeOfTown,
      City: this.city,
      ApartmentNumber: this.apartmentNumber,
      PostOffice: this.postOffice
    };
    this._httpService.put('/api/candidate/candidates', body).subscribe(result => {
      this.snackbar.open('Dane zmienione', '', {
        duration: 10000
      });
    }, error => {
      this.snackbar.open('Nie udało się zmienić danych', '', {
        duration: 10000
      });
    });
  }

  checkValidation() {
    if (this.country === 'Polska') {
      this.controls.push(this.firstNameControl, this.lastNameControl, this.secondNameControl, this.familyNameControl,
        this.peselControl, this.genderControl, this.nationalityControl, this.birthdateControl,
        this.motherNameControl, this.fatherNameControl, this.countryControl, this.streetControl,
        this.postalCodeControl, this.voivodeshipControl, this.houseNumberControl, this.houseNumberControl,
        this.typeOfTownControl, this.cityControl, this.apartmentNumberControl, this.postalCodeControl);
      return this._validationService.checkValidation(new FormArray(this.controls));
    } else if (this.country !== 'Polska') {
      this.controls.push(this.firstNameControl, this.lastNameControl, this.secondNameControl, this.familyNameControl,
        this.peselControl, this.genderControl, this.nationalityControl, this.birthdateControl,
        this.motherNameControl, this.fatherNameControl, this.countryControl, this.streetControl,
        this.postalCodeControl, this.houseNumberControl, this.houseNumberControl, this.typeOfTownControl,
        this.cityControl, this.apartmentNumberControl, this.postalCodeControl);
      return this._validationService.checkValidation(new FormArray(this.controls));
    }
  }
}
