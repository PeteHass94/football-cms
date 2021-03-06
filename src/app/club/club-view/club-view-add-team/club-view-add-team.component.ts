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
  selector: 'app-club-view-add-team',
  templateUrl: './club-view-add-team.component.html',
  styleUrls: ['./club-view-add-team.component.css']
})
export class ClubViewAddTeamComponent implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public clubService: ClubService,
    private _snackBar: MatSnackBar) {}

  managerUserForm = this.fb.group({
    userType: ['manager'],
    role: [''],
    name: [''],
    username: [''],
    club: [''],
    teamName:[''],
    password: ['']
  });




  ngOnInit() {
    console.log(this.clubService.getClub());
    this.managerUserForm.get('club').setValue(this.clubService.getClubName());
    this.managerUserForm.get('username').setValue(this.clubService.getClubName());

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
    let useTeam = "";

    this.managerUserForm.valueChanges
    .subscribe(x => {
      //console.log(x);
      useRole = this.managerUserForm.get("role").value;
      if(useRole) {
        if(useRole.length > 5)
          useRole = useRole.substring(0,5);
      }
      useName = this.managerUserForm.get("name").value;
      if(/\s/.test(useName))
        useName.replace(/\s/g, "");
      useClub = this.managerUserForm.get("club").value;
      if(/\s/.test(useClub))
        useClub.replace(/\s/g, "");
      useTeam = this.managerUserForm.get("teamName").value;
      if(/\s/.test(useTeam))
        useTeam.replace(/\s/g, "");

      newUsername = (useClub + useTeam + "manager" +useRole + useName).toLowerCase();
      if(!this.usernameFocus)
        this.managerUserForm.get("username").setValue(newUsername, { emitEvent: false });
    });


  }

  usernameFocus = false;
  onUsernameFocus() {
    this.usernameFocus = true;
    this.managerUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.managerUserForm.get("username").value;
      this.managerUserForm.get("username").setValue(value, { emitEvent: false });
    });
  }

  onUsernameBlur() {
    this.managerUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.managerUserForm.get("username").value;
      this.managerUserForm.get("username").setValue(value, { emitEvent: false });
    });
    this.usernameFocus = false;
  }


  onSubmit() {
    console.log(this.managerUserForm.value);

    this.isLoading = true;
    this.authService.createManagerUser(
      this.managerUserForm.get("userType").value,
      this.managerUserForm.get("role").value,
      this.managerUserForm.get("name").value,
      this.managerUserForm.get("username").value.toLowerCase(),
      this.managerUserForm.get("club").value,
      this.managerUserForm.get("teamName").value,
      this.managerUserForm.get("password").value
    );

    this._snackBar.open(
      "(Created Team) UserName: " +
      this.managerUserForm.get("username").value.toLowerCase() +
      " For " +
      this.managerUserForm.get("club").value,
     'Hide', {
      duration: 3000
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
