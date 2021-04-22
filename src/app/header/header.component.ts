import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { ClubService } from "../club/club.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  //isLoading = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}


  //userType = localStorage.getItem("userType");
  user = this.authService.getAuthData();
  //club.id;


  ngOnInit() {
    if(!localStorage.getItem("userType")) {
      localStorage.setItem('userType', 'no reload')
      location.reload();
    }

    //this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getAuthData();

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      //console.log(this.user.)

      if(this.user.userType == "club") {

      }


    });



  }










  onLogout() {
    this.authService.logoutUser();
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
