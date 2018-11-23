import { Component, OnInit } from '@angular/core';
import { FORMSOFSTUDIES, DEGREESOFSTUDIES, FIELDSOFSTUDIES } from '../../../shared/consts';
import { CandidateService } from '../../../services/candidate.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { MatSnackBar } from '../../../../../node_modules/@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-of-study',
  templateUrl: './field-of-study.component.html',
  styleUrls: ['./field-of-study.component.css']
})
export class FieldOfStudyComponent implements OnInit {

  constructor(private _candidateService: CandidateService, private _httpService: HttpService, private _router: Router, public snackbar: MatSnackBar) { }

  formsOfStudies = FORMSOFSTUDIES;
  degreesOfStudies = DEGREESOFSTUDIES;
  fieldsOfStudies = FIELDSOFSTUDIES;

  fieldOfStudy = '';
  specialization = '';
  degreeOfStudy = '';
  formOfStudy = '';

  formOfStudyControl = new FormControl('', []);
  degreeOfStudyControl = new FormControl('', []);
  fieldOfStudyControl = new FormControl('', []);

  isFormValid = false;

  ngOnInit() {}

  isValidEvent(event, index?) {
    if (this.degreeOfStudy === 'Drugiego stopnia') {
        this.fieldOfStudy = event.target.parentElement.parentElement.outerText;
        const array = Array.from(this.fieldOfStudy);
        const uppercase = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i] === array[i].toUpperCase()) {
            uppercase.push(i);
          }
        }
        this.fieldOfStudy = this.fieldOfStudy.substring(0, uppercase[1]);
    }
    if (index) {
      this._candidateService.setSubjectsForSelectedFieldOfStudy(index);
    }

    if (this.specialization === undefined || this.specialization === 'BRAK') {
      this.specialization = '';
    }

    this._candidateService.setSelectedFieldOfStudyBody(this.formOfStudy, this.degreeOfStudy, this.fieldOfStudy, this.specialization);
    this._candidateService.setDegreeOfStudy(this.degreeOfStudy);
    this.isFormValid = this.degreeOfStudyControl.valid && this.formOfStudyControl.valid && this.fieldOfStudyControl.valid;
    this._candidateService.setIsFieldOfStudyValid(this.isFormValid);
  }

  addFieldOfStudy() {
    if (this._candidateService.getIsHighSchoolInformationValid()) {
      const body: any = Object.assign({}, this._candidateService.getSelectedFieldOfStudyBody(), this._candidateService.getHighSchoolInformationBody());
      this._httpService.post('api/study/firstDegree', body).subscribe(result => {
        if (result === true) {
          this._router.navigate(['candidateHome']);
        }
      });
    }
    if (this._candidateService.getIsInformationAboutStudiesValid()) {
      const body: any = Object.assign({}, this._candidateService.getSelectedFieldOfStudyBody(), this._candidateService.getInformationAboutStudiesBody());
      console.log(body);
      this._httpService.post('api/study/secondDegree', body).subscribe(result => {
        if (result === true) {
          this._router.navigate(['candidateHome']);
        }
      });
    }
  }
}
