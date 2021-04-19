import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

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
      //this.isLoading = false;
      //this.userType = localStorage.getItem("userType");
      //console.log(this.user.userType);
    });
    //console.log(this.user);
    //console.log(this.user.club);
    //this.username = localStorage.getItem("username");


  }










  onLogout() {
    this.authService.logoutUser();
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
