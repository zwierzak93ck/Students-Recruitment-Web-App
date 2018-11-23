import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { Router } from '../../../../node_modules/@angular/router';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  status = '';
  groupName = '';
  constructor(private _authService: AuthService, private _httpService: HttpService, private _candidateService: CandidateService, private _router: Router) { }

  ngOnInit() {
    this._authService.getStatus();
   this._authService.getGroupName();
  }

  logOut() {
    this._httpService.get('api/user/logout').subscribe(() => {
      this._router.navigate(['/']);
      this._authService.logOut();
    }
    );
  }
}
