import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { CandidateService } from '../../../services/candidate.service';
import { normalizeStyles } from '@angular/animations/browser/src/util';
import { ValidationService } from '../../../services/validation.service';
import { TITLES, FIELDSOFSTUDIES } from '../../../shared/consts';

@Component({
  selector: 'app-information-about-studies',
  templateUrl: './information-about-studies.component.html',
  styleUrls: ['./information-about-studies.component.css']
})
export class InformationAboutStudiesComponent implements OnInit {

  years = [];
  grades = [];
  titles = TITLES;
  isFormValid = false;
  universityFullname = '';
  universityHeadquarters = '';
  foreignLanguageGrade = '';
  diplomaGrade = '';
  diplomaNumber = '';
  obtainedTitle = '';
  studyGraduationYear = '';
  fieldsOfStudies = FIELDSOFSTUDIES;
  fieldOfStudy = '';
  specialization = '';
  specializations;

  universityFullnameControl = new FormControl('', []);
  universityHeadquartersControl = new FormControl('', []);
  foreignLanguageGradeControl = new FormControl('', []);
  diplomaGradeControl = new FormControl('', []);
  diplomaNumberControl = new FormControl('', []);
  obtainedTitleControl = new FormControl('', []);
  studyGraduationYearControl = new FormControl('', []);
  fieldOfStudyControl = new FormControl('', []);
  specializationControl = new FormControl('', []);
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

  checkValidation(event, index?) {
    if (index) {
      this._candidateService.setSpecializationsForSelectedFieldOfStudy(index);
      this.specializations = this._candidateService.specializations;
    }
    this.controls.push(this.universityFullnameControl, this.universityHeadquartersControl, this.diplomaNumberControl,
      this.obtainedTitleControl, this.studyGraduationYearControl, this.fieldOfStudyControl, this.specializationControl, this.diplomaGradeControl, this.foreignLanguageGradeControl);

    this._candidateService.setIsInformationAboutStudiesValid(this._validationService.checkValidation(new FormArray(this.controls)));
    this._candidateService.setInformationAboutStudiesBody(this.universityFullname, this.universityHeadquarters, this.diplomaNumber, this.obtainedTitle, this.studyGraduationYear,
    this.fieldOfStudy, this.specialization, this.diplomaGrade, this.foreignLanguageGrade);
  }

}
