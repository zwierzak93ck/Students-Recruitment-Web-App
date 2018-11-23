import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {HttpService} from '../../services/http.service';
import {CandidateService} from '../../services/candidate.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-student-registration-form',
  templateUrl: './student-registration-form.component.html',
  styleUrls: ['./student-registration-form.component.css']
})

export class StudentRegistrationFormComponent implements OnInit {

  url = 'http://localhost:61318/';
  isPersonalDataValid: Boolean = false;
  isRegisteredAddressValid: Boolean = false;
  isPersonalDataBodyConfirmed: Boolean = false;
  isRegisteredAddressBodyConfirmed: Boolean = false;
  personalDataBody;
  registeredAddressBody;
  isExist: any;
  displayedColumns = ['data', 'value'];
  personalDataSource;
  addressDataSource;
  constructor(private _httpService: HttpService, private _router: Router, private _candidateService: CandidateService, public snackbar: MatSnackBar) { }

  ngOnInit() {}

  confirmPersonalDataBody() {
    this.isPersonalDataBodyConfirmed = true;
  }

  confirmRegisteredAddressBody() {
    this.isRegisteredAddressBodyConfirmed = true;
    this.setTableData();
  }

  checkPersonalDataValidation(event) {
    this.isPersonalDataValid = event;
  }

  checkRegisteredAddressValidation(event) {
    this.isRegisteredAddressValid = event;
  }

  addCandidate() {
    const body: any = Object.assign({}, this.personalDataBody, this.registeredAddressBody);
    this._httpService.post('api/candidate/candidates', body).subscribe(receivedData => {
      (receivedData === 'Candidate added') ? this._router.navigate(['candidateHome']) : this.snackbar.open('Nie udało się dodać danych', '', {
        duration: 10000
      });
    });
  }

  setTableData() {
    this.personalDataBody = this._candidateService.getPersonalDataBody();
    const PERSONAL_DATA: DataElements[] = [
      {data: 'Pierwsze imię', value: this.personalDataBody.FirstName},
      {data: 'Drugie imię', value: this.personalDataBody.SecondName},
      {data: 'Nazwisko', value: this.personalDataBody.LastName},
      {data: 'Pesel', value: this.personalDataBody.Pesel},
      {data: 'Płeć', value: this.personalDataBody.Gender},
      {data: 'Narodowość', value: this.personalDataBody.Nationality},
      {data: 'Data urodzenia', value: this._candidateService.setBirthDate(this.personalDataBody.BirthDate)},
      {data: 'Imię matki', value: this.personalDataBody.MotherName},
      {data: 'Imię ojca', value: this.personalDataBody.FatherName},
      {data: 'Nazwisko rodowe', value: this.personalDataBody.FamilyName}
    ];

    this.registeredAddressBody = this._candidateService.getRegisteredAddressBody();
    const ADDRESS_DATA: DataElements[] = [
      {data: 'Kraj', value: this.registeredAddressBody.Country},
      {data: 'Województwo', value: this.registeredAddressBody.Voivodeship},
      {data: 'Miasto', value: this.registeredAddressBody.City},
      {data: 'Ulica', value: this.registeredAddressBody.Street},
      {data: 'Numer domu', value: this.registeredAddressBody.HouseNumber},
      {data: 'Numer mieszkania', value: this.registeredAddressBody.ApartmentNumber},
      {data: 'Kod pocztowy', value: this.registeredAddressBody.PostalCode},
      {data: 'Typ miejscowości', value: this.registeredAddressBody.TypeOfTown},
      {data: 'Poczta', value: this.registeredAddressBody.PostOffice}
    ];

    this.personalDataSource = new MatTableDataSource(PERSONAL_DATA);
    this.addressDataSource = new MatTableDataSource(ADDRESS_DATA);
  }
}

export interface DataElements {
  data: string;
  value: string;
}

