import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthData } from "../auth/auth-data.model";

import { AuthService } from "../auth/auth.service";
import { ClubService } from "../club/club.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  isLoading = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  user = this.authService.getAuthDataFromLS();
  userModel: AuthData;

  ngOnInit() {

    this.isLoading = true;

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      if(this.userIsAuthenticated){

        if(!this.user.userType ) {
          this.router.navigate(['/'])
          .then(() => {
            //console.log(location);
            location.reload()
          });
        }
        this.userModel = this.authService.returnUser();
        let userId = this.authService.getUserId();
        if(this.user.userId !== userId ) {
          this.router.navigate(['/'])
          .then(() => {
            //console.log(location);
            location.reload()
          });
        }

        console.log(this.user.userId);
        this.user = this.overwriteUser(this.user, this.userModel, userId);
        console.log(this.user);
        console.log(this.router.url);
      }


    });



  }


  private overwriteUser(theUser: any, userModel: AuthData, userId: string) {
    const overwrittenUser = theUser;

    if(theUser.userid != userId || theUser.userid) {
      overwrittenUser.userid = userId;
    }

    if(theUser.username) {
      overwrittenUser.username = userModel.username;
    }
    if(theUser.userType) {
      overwrittenUser.userType = userModel.userType;
    }
    if(theUser.role) {
      overwrittenUser.role = userModel.role;
    }
    if(theUser.name) {
      overwrittenUser.name = userModel.name;
    }
    if(theUser.league != 'undefined') {
      overwrittenUser.league = userModel.league;
    }
    if(theUser.club != 'undefined') {
      overwrittenUser.club = userModel.club;
    }
    if(theUser.team != 'undefined') {
      overwrittenUser.team = userModel.team;
    }
    if(theUser.dob && theUser.dob != 'undefined') {
      console.log(userModel.dob);
      overwrittenUser.dob = userModel.dob.toDateString().substring(0,4);
    }

    return overwrittenUser;
  }

  consolelog() {
    console.log(this.user);
  }


  onLogout() {
    this.authService.logoutUser();
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
