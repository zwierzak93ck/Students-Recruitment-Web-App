import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../services/http.service';
import { RecruiterService } from '../../services/recruiter.service';
import { FormControl, FormArray } from '../../../../node_modules/@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.css']
})
export class AddGroupDialogComponent implements OnInit {

  form;
  degree;
  faculty;
  field;
  specialization;
  formControl = new FormControl('', []);
  degreeControl = new FormControl('', []);
  facultyControl = new FormControl('', []);
  fieldControl = new FormControl('', []);
  specializationControl = new FormControl('', []);
  controls = new Array<FormControl>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddGroupDialogComponent>, private _httpService: HttpService,
              private _validationService: ValidationService) {
               }

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  createGroup() {
    if (this.specialization === undefined || this.specialization === 'BRAK') {
      this.specialization = '';
    }
    const body = {
      Form: this.form,
      Degree: this.degree,
      Faculty: this.faculty,
      Field: this.field,
      Specialization: this.specialization,
      GroupName: this.form + this.degree + this.faculty + this.field + this.specialization
    };
    this._httpService.post('api/group/groups', body).subscribe();
    this.closeDialog();
  }

  checkValidation() {
    if (this.degree === '1') {
      this.controls.push(this.formControl, this.degreeControl, this.facultyControl, this.fieldControl);
      return this._validationService.checkValidation(new FormArray(this.controls));
    } else if (this.degree === '2') {
        this.controls.push(this.formControl, this.degreeControl, this.facultyControl, this.fieldControl, this.specializationControl);
        return this._validationService.checkValidation(new FormArray(this.controls));
      }
    }
}
