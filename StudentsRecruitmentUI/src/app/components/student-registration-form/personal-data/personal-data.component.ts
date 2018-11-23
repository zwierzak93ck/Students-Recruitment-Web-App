import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import {GENDERS, NATIONALITIES} from '../../../shared/consts';
import { CandidateService } from '../../../services/candidate.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Output() personalDataValid = new EventEmitter();
  @Input() personalDataBodyConfirmed: Boolean;

  valid: Boolean;
  firstName = '';
  secondName = '';
  lastName = '';
  familyName = '';
  pesel = '';
  gender = '';
  birthdate: Date = new Date();
  nationality = 'Austria';
  motherName = '';
  fatherName = '';

  isFormValid = false;

  public genders = GENDERS;
  public nationalities = NATIONALITIES;
  namePattern = '[A-ZĄĆĘŁŃÓŚŹŻ]{1}[a-ząćęłńóśźż]{1,32}';

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
  controls = new Array<FormControl>();

  constructor(private _candidateService: CandidateService, private _validationService: ValidationService) {}

  ngOnInit() { }

  isValidEvent() {
    this._candidateService.setPersonalDataBody(this.firstName, this.secondName, this.lastName,
      this.familyName, this.pesel, this.gender, this.birthdate , this.nationality, this.motherName, this.fatherName);

      this.controls.push(this.peselControl, this.firstNameControl, this.lastNameControl,
                        this.motherNameControl, this.fatherNameControl, this.genderControl,
                        this.birthdateControl, this.nationalityControl, this.secondNameControl,
                        this.familyNameControl, this.identityDocumentControl);
    this.personalDataValid.emit(this._validationService.checkValidation(new FormArray(this.controls)));
  }
}
