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

  // user: AuthData = {
  //   username: null,
  //   role: null,
  //   userType: null,
  //   name: null,
  //   dob: null,
  //   club: null,
  //   team: null,
  //   league: null,
  //   password: null
  // };
  //user: any;
  //userType = localStorage.getItem("userType");
  //user = this.authService.returnUser();
  //club.id;
  user = this.authService.getAuthDataFromLS();
  userModel: AuthData;

  ngOnInit() {
    //this.user = this.authService.getAuthDataFromLS();
    //console.log(this.user);

    // if(!this.user.userType && !localStorage.getItem("userType")) {
    //   localStorage.setItem('userType', 'no reload')
    //   location.reload();
    // }

    this.isLoading = true;

    //console.log(this.user);

    // this.authService.getUser(this.userId).subscribe(gotUser => {
    //   this.user = gotUser.user;
    //   this.isLoading = false;
    // });
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
        this.user = this.overwriteUser(this.user, this.userModel);
        console.log(this.user);
        console.log(this.router.url);
      }
      // if(this.user.userType == "club") {

      // }


    });



  }


  private overwriteUser(theUser: any, userModel: AuthData) {
    const overwrittenUser = theUser;

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
