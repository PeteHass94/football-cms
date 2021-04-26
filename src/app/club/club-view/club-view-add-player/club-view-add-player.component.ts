import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { AuthService } from "../../../auth/auth.service";
import { ClubService } from '../../club.service';

interface Club {
  value: string;
  viewValue: string;
}
interface Team {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-club-view-add-player',
  templateUrl: './club-view-add-player.component.html',
  styleUrls: ['./club-view-add-player.component.css']
})
export class ClubViewAddPlayerComponent implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public clubService: ClubService,
    private _snackBar: MatSnackBar) {}

  playerUserForm = this.fb.group({
    userType: ['player'],
    role: ['adult or junior'],
    name: [''],
    username: [''],
    club: [''],
    dob:[''],
    password: ['password']
  });




  ngOnInit() {
    console.log(this.clubService.getClub());
    this.playerUserForm.get('club').setValue(this.clubService.getClubName());
    this.playerUserForm.get('username').setValue(this.clubService.getClubName());

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
      useName = this.playerUserForm.get("name").value;
      if(useName)
        useName.replace(/\s/g, "");
      if(this.playerUserForm.get("dob").value){
        getDate = this.playerUserForm.get("dob").value;
        useDate = getDate.getFullYear();
      }
      else
        useDate = new Date().getFullYear();
      newUsername = (useName + useDate).toLowerCase().replace(/\s/g, "");;
      if(!this.usernameFocus)
        this.playerUserForm.get("username").setValue(newUsername, { emitEvent: false });
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

    this.authService.createPlayerUser(
      this.playerUserForm.get("userType").value,
      this.playerUserForm.get("role").value,
      this.playerUserForm.get("name").value,
      this.playerUserForm.get("username").value.toLowerCase(),
      this.playerUserForm.get("club").value,
      getDate,
      this.playerUserForm.get("password").value
    );

    this._snackBar.open(
      "(Created Player) UserName: " +
      this.playerUserForm.get("username").value.toLowerCase() +
      " For " +
      this.playerUserForm.get("club").value,
     'Hide', {
      duration: 3000
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
