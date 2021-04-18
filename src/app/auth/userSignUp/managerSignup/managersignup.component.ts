import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-manager-signup',
  templateUrl: './managersignup.component.html',
  styleUrls: ['./managersignup.component.css']
})
export class ManagerSignupComponent implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  managerUserForm = this.fb.group({
    userType: ['manager'],
    role: [''],
    name: [''],
    username: [''],
    club: [''],
    team:[''],
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

    this.managerUserForm.valueChanges
    .subscribe(x => {
      //console.log(x);
      if(this.managerUserForm.get("role").value.length > 4)
        useRole = this.managerUserForm.get("role").value.substring(0,5);
      else
        useRole = this.managerUserForm.get("role").value;
      useName = this.managerUserForm.get("name").value.replace(/\s/g, "");
      useClub = this.managerUserForm.get("club").value.replace(/\s/g, "");
      newUsername = (useClub + useRole + useName).toLowerCase();
      if(!this.usernameFocus)
        this.managerUserForm.get("username").setValue(newUsername, { emitEvent: false });
    });

    //console.log(this.authService.getAllClubs());
  }

  usernameFocus = false;
  onUsernameFocus() {
    this.usernameFocus = true;
    this.managerUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.managerUserForm.get("username").value.replace(/\s/g, "");
      this.managerUserForm.get("username").setValue(value, { emitEvent: false });
    });
  }

  onUsernameBlur() {
    this.managerUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.managerUserForm.get("username").value.replace(/\s/g, "");
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
      this.managerUserForm.get("team").value,
      this.managerUserForm.get("password").value
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}

