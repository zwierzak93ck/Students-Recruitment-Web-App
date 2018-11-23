import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatTableDataSource, MatButton, MatSnackBar, MatDialog } from '@angular/material';
import { RecruiterService } from '../../services/recruiter.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';

@Component({
  selector: 'app-show-candidates-table',
  templateUrl: './show-candidates-table.component.html',
  styleUrls: ['./show-candidates-table.component.css']
})
export class ShowCandidatesTableComponent implements OnInit {

  candidates: Array<any> = [];
  dataSource;
  url;
  tableType;
  selectedGroup = '';
  score = '';
  changeStatusButton = '';
  specialization;
  acceptedDisplayedColumns = ['firstName', 'lastName', 'selectedFormOfStudy', 'selectedDegreeOfStudy', 'selectedFieldOfStudy', 'selectedSpecialization', 'score', 'addToGroup'];
  rejectedDisplayedColumns = ['firstName', 'lastName', 'selectedFormOfStudy', 'selectedDegreeOfStudy', 'selectedFieldOfStudy', 'selectedSpecialization', 'score', 'updateStatus'];
  duringDisplayedColumns = ['firstName', 'lastName', 'selectedFormOfStudy', 'selectedDegreeOfStudy', 'selectedFieldOfStudy', 'selectedSpecialization', 'score', 'isRecruitmentPaid', 'updateStatus'];
  displayedColumns;
  constructor(private _httpService: HttpService, private _recruiterService: RecruiterService, public snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.setTableData();
  }

  changeStatus(candidates, event) {
    const id = candidates.candidateId;
    const newStatus = event.target.innerText === 'Odrzuć' ? 'reject' : 'accept';
    this._httpService.post('api/candidate/status?candidateId=' + id + '&newStatus=' + newStatus, null).subscribe(result => {
      this.setTableData();
      this.snackbar.open('Zmieniono status kandydata ' + candidates.firstName + ' ' + candidates.lastName, '', {
        duration: 10000
      });
     this._recruiterService.refreshTable();
    }, error => {
      this.snackbar.open('Nie udało się zmienić statusu dla kandydata ' + candidates.firstName + ' ' + candidates.lastName, '', {
        duration: 10000
      });
    });
  }

  confirmPayment(candidates) {
    const id = candidates.candidateId;
    this._httpService.get('api/candidate/payment?candidateId=' + id).subscribe(result => {
     this.snackbar.open('Płatność dla kandydata ' + candidates.firstName + ' ' + candidates.lastName + ' została zatwierdzona', '', {
       duration: 10000
     });
     this._recruiterService.refreshTable();
    }, error => {
      this.snackbar.open('Nie udało się zatwierdzić płatności dla kandydata ' + candidates.firstName + ' ' + candidates.lastName);
    });
  }

  setTableData() {

    this._recruiterService.tableType.subscribe(receivedData => {
        this.tableType = receivedData;
        switch (this.tableType) {
        case 0: {
          this.url = 'api/candidate/accepted';
          this.displayedColumns = this.acceptedDisplayedColumns;
          break;
        }
        case 1: {
          this.url = 'api/candidate/rejected';
          this.displayedColumns = this.rejectedDisplayedColumns;
          break;
        }
        case 2: {
          this.url = 'api/candidate/during';
          this.displayedColumns = this.duringDisplayedColumns;
          break;
        }
        default:
          break;
      }

      const ELEMENTDATA: Data[] = [];

    // tslint:disable-next-line:no-shadowed-variable
    this._httpService.get(this.url).subscribe(receivedData => {
      console.log(receivedData);
      this.candidates = receivedData;
      this.candidates.forEach(element => {
        ELEMENTDATA.push(element);
      });
      this.dataSource = new MatTableDataSource(ELEMENTDATA);
      this.candidates.forEach(element => {
        if (element.scoreFirst !== undefined && element.scoreFirst.length > 0) {
          if (element.scoreFirst[0].score >= 112) {
            element.buttonTitle = 'Przyjmij';
          } else {
            element.buttonTitle = 'Odrzuć';
          }
        } else if (element.scoreSecond !== undefined && element.scoreSecond.length > 0) {
          if (element.scoreSecond[0].score >= 64) {
            element.buttonTitle = 'Przyjmij';
          } else {
            element.buttonTitle = 'Odrzuć';
          }
        }
      });
    });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddGroupDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this._recruiterService.refreshTable();
    });
  }

  addToGroup(candidates) {
    const id = candidates.candidateId;
    const groupName = this.selectedGroup;
    this._httpService.get('api/candidate/group?candidateId=' + id + '&groupName=' + groupName).subscribe(result => {
      this.snackbar.open('Kandydat ' + candidates.firstName + ' ' + candidates.lastName + ' został dodany do grupy ' + groupName, '', {
        duration: 10000
      });
      this.setTableData();
      this._recruiterService.refreshTable();
    }, error => {
      this.snackbar.open('Nie udało sie dodać kandydata ' + candidates.firstName + ' ' + candidates.lastName + ' do grupy ' + groupName, '', {
        duration: 10000
      });
    });
  }
}

export interface Data {
  firstName: string;
  lastname: string;
  pesel: number;
  selectedFormOfStudy: string;
  selectedDegreeOfStudy: string;
  selectedFieldOfStudy: string;
  selectedSpecialization: string;
  isRecruitmentPaid: boolean;
  updateStatus: MatButton;
  addToGroup: MatButton;
  score: number;
  buttonTitle: string;
}



