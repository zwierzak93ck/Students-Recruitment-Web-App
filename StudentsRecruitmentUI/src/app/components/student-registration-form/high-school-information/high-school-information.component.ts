import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { ValidationService } from '../../../services/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { FIELDSOFSTUDIES, COMMISSIONSHEADQUARTERS } from '../../../shared/consts';

@Component({
  selector: 'app-high-school-information',
  templateUrl: './high-school-information.component.html',
  styleUrls: ['./high-school-information.component.css']
})
export class HighSchoolInformationComponent implements OnInit {

  years = [];
  grades = [];
  subjects = [];
  fieldsOfStudies = FIELDSOFSTUDIES;
  commissionsHeadquarters = COMMISSIONSHEADQUARTERS;
  isFormValid = false;

  highSchoolHeadquarter = '';
  commissionHeadquarter = '';
  highSchoolName = '';
  maturityCertificateNumber = '';
  highSchoolGraduationYear = '';
  mathGrade = '';
  foreignLanguageGrade = '';
  polishLanguageGrade = '';
  selectedSubjectGrade = '';
  selectedSubject = '';

  highSchoolHeadquarterControl = new FormControl('', []);
  commissionHeadquarterControl = new FormControl('', []);
  highSchoolNameControl = new FormControl('', []);
  maturityCertificateNumberControl = new FormControl('', []);
  highSchoolGraduationYearControl = new FormControl('', []);
  mathGradeControl = new FormControl('', []);
  foreignLanguageGradeControl = new FormControl('', []);
  polishLanguageGradeControl = new FormControl('', []);
  selectedSubjectGradeControl = new FormControl('', []);
  selectedSubjectControl = new FormControl('', []);
  controls = new Array<FormControl>();
  constructor(private _candidateService: CandidateService, private _validationService: ValidationService) { }

  ngOnInit() {
    for (let j = 1950; j <= new Date().getFullYear(); j++) {
      this.years.push(j);
    }

    const n = this._candidateService.getDegreeOfStudy() === 'Pierwszego stopnia' ? 6 : 5;
    const i = this._candidateService.getDegreeOfStudy() === 'Pierwszego stopnia' ? 2 : 3;
    for (let k = i; k <= n; k += 0.5) {
      this.grades.push(k);
    }
  }

  checkValidation() {

    this.controls.push(this.highSchoolGraduationYearControl, this.highSchoolHeadquarterControl, this.highSchoolNameControl,
                        this.commissionHeadquarterControl, this.foreignLanguageGradeControl, this.mathGradeControl,
                        this.foreignLanguageGradeControl, this.polishLanguageGradeControl, this.selectedSubjectControl,
                        this.selectedSubjectGradeControl, this.maturityCertificateNumberControl);
     this._candidateService.setIsHighSchoolInformationValid(
       this._validationService.checkValidation(new FormArray(this.controls))
     );
    this._candidateService.setHighSchoolInformationBody(this.highSchoolHeadquarter, this.commissionHeadquarter, this.highSchoolName, this.maturityCertificateNumber, this.highSchoolGraduationYear,
      this.mathGrade, this.foreignLanguageGrade, this.polishLanguageGrade, this.selectedSubjectGrade, this.selectedSubject);
  }
}
