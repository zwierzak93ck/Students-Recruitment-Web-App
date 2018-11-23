import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RecruiterService } from '../../services/recruiter.service';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recruiter-home-screen',
  templateUrl: './recruiter-home-screen.component.html',
  styleUrls: ['./recruiter-home-screen.component.css']
})
export class RecruiterHomeScreenComponent implements OnInit {

  loggedInUserName: any;
  isShowCandidatesTable = false;
  isShowGroupsTable = false;
  constructor(private _authService: AuthService, private _recruiterService: RecruiterService, private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {}

  showCandidatesTable(type: number) {
    this._recruiterService.setTableType(type);
    this.isShowCandidatesTable = true;
    this.isShowGroupsTable = false;
  }

  showGroupsTable() {
    this.isShowGroupsTable = true;
    this.isShowCandidatesTable = false;
  }

  logOut() {
    this._httpService.get('api/user/signOut').subscribe(() => {
      this._router.navigate(['/']);
      this._authService.logOut();
    }
    );
  }
}
