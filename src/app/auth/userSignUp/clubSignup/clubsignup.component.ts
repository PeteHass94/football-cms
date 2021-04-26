import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from "../../auth.service";

interface Club {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-club-signup',
  templateUrl: './clubsignup.component.html',
  styleUrls: ['./clubsignup.component.css']
})
export class ClubSignupComponent implements OnInit, OnDestroy{
  isLoading = false;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  clubs: Club[] = [
    {value: 'Na', viewValue: 'Na'}
  ]

  clubUserForm = this.fb.group({
    userType: ['club'],
    role: [''],
    name: [''],
    username: [''],
    club: [''],
    password: ['password']
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
    let useClub = "";

    this.clubUserForm.valueChanges
    .subscribe(x => {
      if(this.clubUserForm.get("role").value.length > 4)
        useRole = this.clubUserForm.get("role").value.substring(0,5);
      else
        useRole = this.clubUserForm.get("role").value;
      useName = this.clubUserForm.get("name").value.replace(/\s/g, "");
      useClub = this.clubUserForm.get("club").value.replace(/\s/g, "");
      newUsername = (useClub + useRole + useName).toLowerCase();
      if(!this.usernameFocus)
        this.clubUserForm.get("username").setValue(newUsername, { emitEvent: false });
    });

  }

  usernameFocus = false;
  onUsernameFocus() {
    this.usernameFocus = true;
    this.clubUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.clubUserForm.get("username").value.replace(/\s/g, "");
      this.clubUserForm.get("username").setValue(value, { emitEvent: false });
    });
  }

  onUsernameBlur() {
    this.clubUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.clubUserForm.get("username").value.replace(/\s/g, "");
      this.clubUserForm.get("username").setValue(value, { emitEvent: false });
    });
    this.usernameFocus = false;
  }


  onSubmit() {
    console.log(this.clubUserForm.value);

    this.isLoading = true;
    this.authService.createClubUser(
      this.clubUserForm.get("userType").value,
      this.clubUserForm.get("role").value,
      this.clubUserForm.get("name").value,
      this.clubUserForm.get("username").value.toLowerCase(),
      this.clubUserForm.get("club").value,
      this.clubUserForm.get("password").value
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
