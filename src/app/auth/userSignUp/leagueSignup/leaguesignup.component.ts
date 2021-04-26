import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-league-signup',
  templateUrl: './leaguesignup.component.html',
  styleUrls: ['./leaguesignup.component.css']
})
export class LeagueSignupComponent implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  leagueUserForm = this.fb.group({
    userType: ['league'],
    role: [''],
    name: [''],
    username: [''],
    league: [''],
    password: ['']
  });

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    let newUsername: string;
    let useRole = "";
    let useName = "";
    let useLeague = "";

    this.leagueUserForm.valueChanges
    .subscribe(x => {
      //console.log(x);
      if(this.leagueUserForm.get("role").value.length > 4)
        useRole = this.leagueUserForm.get("role").value.substring(0,5);
      else
        useRole = this.leagueUserForm.get("role").value;
      useName = this.leagueUserForm.get("name").value.replace(/\s/g, "");
      useLeague = this.leagueUserForm.get("league").value.replace(/\s/g, "");
      newUsername = (useLeague + useRole + useName).toLowerCase();
      if(!this.usernameFocus)
        this.leagueUserForm.get("username").setValue(newUsername, { emitEvent: false });
    });
  }
  usernameFocus = false;
  onUsernameFocus() {
    this.usernameFocus = true;
    this.leagueUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.leagueUserForm.get("username").value.replace(/\s/g, "");
      this.leagueUserForm.get("username").setValue(value, { emitEvent: false });
    });
  }

  onUsernameBlur() {
    this.leagueUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.leagueUserForm.get("username").value.replace(/\s/g, "");
      this.leagueUserForm.get("username").setValue(value, { emitEvent: false });
    });
    this.usernameFocus = false;
  }


  onSubmit() {
    console.log(this.leagueUserForm.value);

    this.isLoading = true;
    this.authService.createLeagueUser(
      this.leagueUserForm.get("userType").value,
      this.leagueUserForm.get("role").value,
      this.leagueUserForm.get("name").value,
      this.leagueUserForm.get("username").value.toLowerCase(),
      this.leagueUserForm.get("league").value,
      this.leagueUserForm.get("password").value

    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
