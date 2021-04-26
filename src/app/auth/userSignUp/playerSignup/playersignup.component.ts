import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from "../../auth.service";

interface Club {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-player-signup',
  templateUrl: './playersignup.component.html',
  styleUrls: ['./playersignup.component.css']
})
export class PlayerSignupComponent implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  playerUserForm = this.fb.group({
    userType: ['player'],
    role: [''],
    name: [''],
    username: [''],
    club: [''],
    dob:[''],
    password: ['password']
  });


  clubsJSON: JSON;
  clubs: Club[] = [
    {value: 'Na', viewValue: 'Na'}
  ];

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    let newUsername: string;
    let useRole = "";
    let useName = "";
    let useClub = "";
    let getDate: Date;
    let useDate: number;

    this.playerUserForm.valueChanges
    .subscribe(x => {
      //console.log(x);
      if(this.playerUserForm.get("role").value.length > 4)
        useRole = this.playerUserForm.get("role").value.substring(0,5);
      else
        useRole = this.playerUserForm.get("role").value;
      useName = this.playerUserForm.get("name").value.replace(/\s/g, "");
      useClub = this.playerUserForm.get("club").value.replace(/\s/g, "");
      if(this.playerUserForm.get("dob").value){
        getDate = this.playerUserForm.get("dob").value;
        useDate = getDate.getFullYear();
      }
      else
        useDate = new Date().getFullYear();
      newUsername = (useName + useDate).toLowerCase();
      if(!this.usernameFocus)
        this.playerUserForm.get("username").setValue(newUsername, { emitEvent: false });
    });

    this.authService.getAllClubs().subscribe(
      (transformedClubData) => {
        this.clubsJSON = transformedClubData.clubs;
        //console.log(this.clubsJSON);
        for (let element in this.clubsJSON) {
          this.clubs.push({
              viewValue: this.clubsJSON[element],
              value: this.clubsJSON[element]
          });
      }
      });


  }

  usernameFocus = false;
  onUsernameFocus() {
    this.usernameFocus = true;
    this.playerUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.playerUserForm.get("username").value.replace(/\s/g, "");
      this.playerUserForm.get("username").setValue(value, { emitEvent: false });
    });
  }

  onUsernameBlur() {
    this.playerUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.playerUserForm.get("username").value.replace(/\s/g, "");
      this.playerUserForm.get("username").setValue(value, { emitEvent: false });
    });
    this.usernameFocus = false;
  }


  onSubmit() {
    console.log(this.playerUserForm.value);
    this.isLoading = true;
    let getDate: Date = new Date(this.playerUserForm.get("dob").value);
    console.log(getDate);
    this.authService.createPlayerUser(
      this.playerUserForm.get("userType").value,
      this.playerUserForm.get("role").value,
      this.playerUserForm.get("name").value,
      this.playerUserForm.get("username").value.toLowerCase(),
      this.playerUserForm.get("club").value,
      getDate,
      this.playerUserForm.get("password").value
    );
    //this.playerUserForm.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}

