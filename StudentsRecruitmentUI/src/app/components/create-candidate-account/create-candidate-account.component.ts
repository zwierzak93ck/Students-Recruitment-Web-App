import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormControlName, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpService} from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-create-candidate-account',
  templateUrl: './create-candidate-account.component.html',
  styleUrls: ['./create-candidate-account.component.css']
})
export class CreateCandidateAccountComponent implements OnInit {

  email = '';
  password = '';
  emailConfirm = '';
  passwordConfirm = '';

  emailControl = new FormControl('', []);
  emailConfirmControl = new FormControl('', []);
  passwordControl = new FormControl('', []);
  passwordConfirmControl = new FormControl('', []);
  controls = new Array<FormControl>();
  errorMessage = '';
  constructor(private _httpService: HttpService, private _validationService: ValidationService, private _router: Router, public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  register() {
    const body = {
      Login: this.email,
      Password: this.password,
    };
    this._httpService.post('api/user/users', body).subscribe(receivedData => {
      if (receivedData === true) {
        this._router.navigate(['/']);
      }
      if (receivedData.value === 'User Already Exist') {
        this.errorMessage = 'Użytkownik o podanym adresie e-mail już istnieje';
        this.snackbar.open('Nie udało się utworzyć konta', '', {
          duration: 10000,
        });
      }
    });
  }

  checkValidation() {
    this.controls.push(this.emailControl, this.passwordControl, this.emailConfirmControl, this.passwordConfirmControl);
    return this._validationService.checkValidation(new FormArray(this.controls)) && (this.email === this.emailConfirm) && (this.password === this.passwordConfirm);
  }

  checkEmails() {
    return this.email === this.emailConfirm ? true : false;
  }

  checkPasswords() {
    return this.password !== this.passwordConfirm ? true : false;
  }
}
