import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CandidateService } from '../../services/candidate.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-candidate-home-screen',
  templateUrl: './candidate-home-screen.component.html',
  styleUrls: ['./candidate-home-screen.component.css']
})
export class CandidateHomeScreenComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  @ViewChild('photo') photo;
  url = 'http://localhost:61318/';
  isExist: any;
  loggedInUserName: any;
  activeUrl: Boolean;
  selectedFile: File = null;
  image = null;
  status = 'Brak';
  constructor(private _httpService: HttpService, private _authService: AuthService, private _candidateService: CandidateService,
              private _router: Router, private _activeRoute: ActivatedRoute, public snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this._authService.checkData();
    this.getCandidatePhoto();
  }

  checkCandidateData() {
    this._authService.isDataAdded ? this._router.navigate(['editcandidate'], { relativeTo: this._activeRoute }) : this._router.navigate(['addcandidate'], { relativeTo: this._activeRoute });
  }

  logOut() {
    this._httpService.get('api/user/signOut').subscribe(() => {
      this._router.navigate(['/']);
      this._authService.logOut();
    }
    );
  }

  selectFile() {
    const file = this.fileInput.nativeElement;
    if (file.files && file.files[0]) {
      this.selectedFile = file.files[0];
    }
    const fd = new FormData();
    fd.append('candidatePhoto', this.selectedFile);
    this._candidateService.addPhoto(fd).subscribe(result => {
      this.snackbar.open('Zdjęcie dodane', '', {
        duration: 10000
      });
      this.getCandidatePhoto();
    }, error => {
      this.snackbar.open('Nie udało się dodać zdjęcia', '', {
        duration: 10000
      });
    });
  }

  getCandidatePhoto() {
    this._candidateService.getPhoto().subscribe(result => {
      this.image = result;
    }, () => {
        this.snackbar.open('Nie udało się pobrać zdjęcia', '', {
          duration: 10000
        });
      });
  }
}

