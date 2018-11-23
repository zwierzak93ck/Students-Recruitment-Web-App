import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from './app.component';
import { StudentRegistrationFormComponent } from './components/student-registration-form/student-registration-form.component';
import { PersonalDataComponent } from './components/student-registration-form/personal-data/personal-data.component';
import { RegisteredAddressComponent } from './components/student-registration-form/registered-address/registered-address.component';
import { FieldOfStudyComponent } from './components/student-registration-form/field-of-study/field-of-study.component';
import { HighSchoolInformationComponent } from './components/student-registration-form/high-School-information/high-school-information.component';
import { InformationAboutStudiesComponent } from './components/student-registration-form/information-about-studies/information-about-studies.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

import { CreateCandidateAccountComponent } from './components/create-candidate-account/create-candidate-account.component';
import { LoginComponent } from './components/login/login.component';
import { CandidateHomeScreenComponent } from './components/candidate-home-screen/candidate-home-screen.component';

import { HttpService } from './services/http.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditCandidateDataComponent } from './components/edit-candidate-data/edit-candidate-data.component';
import { ShowCandidatesTableComponent } from './components/show-candidates-table/show-candidates-table.component';
import { RecruiterHomeScreenComponent } from './components/recruiter-home-screen/recruiter-home-screen.component';
import { ShowGroupTableComponent } from './components/show-group-table/show-group-table.component';

import { AddGroupDialogComponent } from './components/add-group-dialog/add-group-dialog.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: 'register', component: CreateCandidateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'candidateHome', component: CandidateHomeScreenComponent, canActivate: [AuthGuardService], data: {
      expectedType: '0'
    }, children: [
      { path: '', redirectTo: 'candidateHome', pathMatch: 'full' },
      {
        path: 'addcandidate', component: StudentRegistrationFormComponent, data: {
          isDataAdded: 'false'
        }
      },
      {
        path: 'editcandidate', component: EditCandidateDataComponent, data: {
          isDataAdded: 'true'
        }
      },
      { path: 'addfieldofstudy', component: FieldOfStudyComponent }
    ]
  },
  {
    path: 'recruiterHome', component: RecruiterHomeScreenComponent, canActivate: [AuthGuardService], data: {
      expectedType: '1'
    }, children: [
      { path: '', redirectTo: 'recruiterHome', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentRegistrationFormComponent,
    PersonalDataComponent,
    RegisteredAddressComponent,
    FieldOfStudyComponent,
    HighSchoolInformationComponent,
    CreateCandidateAccountComponent,
    LoginComponent,
    CandidateHomeScreenComponent,
    EditCandidateDataComponent,
    InformationAboutStudiesComponent,
    ShowCandidatesTableComponent,
    RecruiterHomeScreenComponent,
    ShowGroupTableComponent,
    AddGroupDialogComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpService,
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
  ],
  entryComponents: [
    AddGroupDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
