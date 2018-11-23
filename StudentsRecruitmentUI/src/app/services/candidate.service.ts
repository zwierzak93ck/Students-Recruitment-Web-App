import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { FIELDSOFSTUDIES } from '../shared/consts';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  personalDataBody;
  registeredAddressBody;
  selectedFieldOfStudyBody;
  highSchoolInformationBody;
  informationAboutStudiesBody;
  degreeOfStudy;
  isHighSchooolInformationValid = false;
  isInformationAboutStudiesValid = false;
  isFieldOfStudyValid = false;
  indexOfSelectedFieldOfStudy;
  subjects;
  specializations;
  fieldsOfStudies = FIELDSOFSTUDIES;

  constructor(private _httpService: HttpService) { }

  exist(): Observable<any> {
    const result = this._httpService.get('api/candidate/exist');
    return result;
  }

  getPhoto(): Observable<any> {
    return this._httpService.get('api/candidate/photo');
  }

  addPhoto(fileToSend: FormData): Observable<any> {
    return this._httpService.put('api/candidate/photo', fileToSend);
  }

  getStatus(): Observable<any> {
    return this._httpService.get('api/candidate/status');
  }

  getGroupName(): Observable<any> {
    return this._httpService.get('api/group/name');
  }

  setPersonalDataBody(firstName: string, secondName: string, lastName: string, familyName: string,
    pesel: string, gender: string, birthDate: Date, nationality: string,
    motherName: string, fatherName: string) {
    this.personalDataBody = {
      FirstName: firstName,
      SecondName: secondName,
      LastName: lastName,
      FamilyName: familyName,
      Pesel: pesel,
      Gender: gender,
      BirthDate: birthDate,
      Nationality: nationality,
      MotherName: motherName,
      FatherName: fatherName
    };
  }

  getPersonalDataBody() {
    return this.personalDataBody;
  }

  setRegisteredAddressBody(country: string, city: string, street: string, postalCode: string, voivodeship: string,
    houseNumber: string, apartmentNumber: string, typeOfTown: string, postOffice: string) {
    this.registeredAddressBody = {
      Country: country,
      Street: street,
      PostalCode: postalCode,
      Voivodeship: voivodeship,
      HouseNumber: houseNumber,
      TypeOfTown: typeOfTown,
      City: city,
      ApartmentNumber: apartmentNumber,
      PostOffice: postOffice
    };
  }

  getRegisteredAddressBody() {
    return this.registeredAddressBody;
  }

  setBirthDate(birthdate: Date) {
    const day = birthdate.getDay() < 10 ? '0' + birthdate.getDay() : birthdate.getDay();
    const month = birthdate.getMonth() < 10 ? '0' + birthdate.getMonth() : birthdate.getMonth();
    const year = birthdate.getFullYear();
    return day + '.' + month + '.' + year;
  }

  setSelectedFieldOfStudyBody(formOfStudy: string, degreeOfStudy: string, fieldOfStudy: string, specialization: string) {
    const spec = specialization === 'Brak Specjalizacji' ? '' : specialization;
    this.selectedFieldOfStudyBody = {
      SelectedFormOfStudy: formOfStudy,
      SelectedDegreeOfStudy: degreeOfStudy,
      SelectedFieldOfStudy: fieldOfStudy,
      SelectedSpecialization: spec
    };
  }

  getSelectedFieldOfStudyBody() {
    return this.selectedFieldOfStudyBody;
  }

  setDegreeOfStudy(degreeOfStudy: string) {
    this.degreeOfStudy = degreeOfStudy;
  }

  getDegreeOfStudy() {
    return this.degreeOfStudy;
  }

  setHighSchoolInformationBody(schoolHeadquarters: string, commissionHeadquarters: string, highSchoolName: string, maturityCertificateNumber: string,
    highSchoolgraduationYear: string, mathGrade: string, foreignLanguageGrade: string, polishLanguageGrade: string, selectedSubjectGrade: string, selectedSubject: string) {
      this.highSchoolInformationBody = {
        HighSchoolHeadquarters: schoolHeadquarters,
        CommissionHeadquarters: commissionHeadquarters,
        HighSchoolName: highSchoolName,
        MaturityCertificateNumber: maturityCertificateNumber,
        HighSchoolGraduationYear: highSchoolgraduationYear,
        MathGrade: mathGrade,
        ForeignLanguageGrade: foreignLanguageGrade,
        PolishLanguageGrade: polishLanguageGrade,
        SelectedSubjectGrade: selectedSubjectGrade,
        SelectedSubject: selectedSubject
      };
  }

  getHighSchoolInformationBody() {
    return this.highSchoolInformationBody;
  }

  setInformationAboutStudiesBody(universityFullname: string, universityHeadquarters: string, diplomaNumber: string, obtainedTitle: string,
    studyGraduationYear: string, studyField: string, studySpecialization: string, foreignLanguageGrade: string, diplomaGrade: string) {
      this.informationAboutStudiesBody = {
        UniversityFullname: universityFullname,
        UniversityHeadquarters: universityHeadquarters,
        DiplomaNumber: diplomaNumber,
        UniversityGraduationYear: studyGraduationYear,
        CompletedStudyField: studyField,
        CompletedStudySpecialization: studySpecialization,
        ObtainedTitle: obtainedTitle,
        ForeignLanguageGrade: foreignLanguageGrade,
        DiplomaGrade: diplomaGrade
      };
  }

  getInformationAboutStudiesBody() {
    return this.informationAboutStudiesBody;
  }

  setIsHighSchoolInformationValid(isValid: boolean) {
    this.isHighSchooolInformationValid = isValid;
    if (this.getIsInformationAboutStudiesValid()) {
      this.setIsInformationAboutStudiesValid(false);
    }
  }

  getIsHighSchoolInformationValid() {
    return this.isHighSchooolInformationValid;
  }

  setIsInformationAboutStudiesValid(isValid: boolean) {
    this.isInformationAboutStudiesValid = isValid;
    if (this.getIsHighSchoolInformationValid()) {
      this.setIsHighSchoolInformationValid(false);
    }
  }

  getIsInformationAboutStudiesValid() {
    return this.isInformationAboutStudiesValid;
  }

  setIsFieldOfStudyValid(isValid: boolean) {
    this.isFieldOfStudyValid = isValid;
  }

  getIsFieldOfStudyValid() {
    return this.isFieldOfStudyValid && (this.getIsInformationAboutStudiesValid() || this.getIsHighSchoolInformationValid());
  }

  setSubjectsForSelectedFieldOfStudy(index: number) {
    this.subjects = this.fieldsOfStudies[index].subjects;
  }

  setSpecializationsForSelectedFieldOfStudy(index: number) {
    this.specializations = this.fieldsOfStudies[index].specializations;
  }

  getSubjectsForSelectedFieldOfStudy() {
    return this.subjects;
  }
}
