import { Component, OnInit, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';
import { RecruiterService } from '../../services/recruiter.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-show-group-table',
  templateUrl: './show-group-table.component.html',
  styleUrls: ['./show-group-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0px', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ShowGroupTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  groups: Array<any> = [];
  dataSource;
  displayedColumns = ['groupName', 'form', 'degree', 'faculty', 'field', 'specialization'];
  expandedElement: Data;
  state = 'collapsed';
  constructor(private _httpService: HttpService, private _recruiterService: RecruiterService, public dialog: MatDialog) { }

  ngOnInit() {
    this._recruiterService.refresh.subscribe(() => {
      const ELEMENTDATA: Data[] = [];
    this._httpService.get('api/group/groups').subscribe(result => {
      this.groups = result;
      this.groups.forEach(element => {
        ELEMENTDATA.push(element);
      });
      this.dataSource = new MatTableDataSource(ELEMENTDATA);
      this.dataSource.sort = this.sort;
    });
    });
  }

animate() {
  this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddGroupDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this._recruiterService.refreshTable();
    });
  }

}

export interface Data {
  groupName: string;
  form: string;
  degree: string;
  faculty: string;
  field: number;
  specialization: string;
  candidates: Array<any>;
}
