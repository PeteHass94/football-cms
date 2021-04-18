
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from "../auth.service";


export type UserType = 'govbody' | 'league' | 'club' | 'manager' | 'player';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  status: boolean = false;

  private authStatusSub: Subscription;
  constructor(public authService: AuthService) {}

  userType: UserType;// = 'govbody';

  get showGovBodySignup() {
    return this.userType === 'govbody';
  }

  get showLeagueSignup() {
    return this.userType === 'league';
  }

  get showClubSignup() {
    return this.userType === 'club';
  }

  get showManagerSignup() {
    return this.userType === 'manager';
  }

  get showPlayerSignup() {
    return this.userType === 'player';
  }


  toggleUserType(type: UserType) {
    this.userType = type;
    this.status = !this.status;
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
