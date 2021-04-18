import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-govbody-signup',
  templateUrl: './govbodysignup.component.html',
  styleUrls: ['./govbodysignup.component.css']
})
export class GovbodySignupComponent implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  govbodyUserForm = this.fb.group({
    userType: ['govbody'],
    role: [''],
    name: [''],
    username: [''],
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

    this.govbodyUserForm.valueChanges
      .subscribe(x => {
        //console.log(x);
        if(this.govbodyUserForm.get("role").value.length > 3)
          useRole = this.govbodyUserForm.get("role").value.substring(0,5);
        else
          useRole = this.govbodyUserForm.get("role").value;
        useName = this.govbodyUserForm.get("name").value.replace(/\s/g, "");
        newUsername = ("gov" + useRole + useName).toLowerCase();
        if(!this.usernameFocus)
          this.govbodyUserForm.get("username").setValue(newUsername, { emitEvent: false });
      });
  }

  usernameFocus = false;
  onUsernameFocus() {
    this.usernameFocus = true;
    this.govbodyUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.govbodyUserForm.get("username").value.replace(/\s/g, "");
      this.govbodyUserForm.get("username").setValue(value, { emitEvent: false });
    });
  }

  onUsernameBlur() {
    this.govbodyUserForm.get("username").valueChanges
    .subscribe(x => {
      // console.log(x);
      let value = this.govbodyUserForm.get("username").value.replace(/\s/g, "");
      this.govbodyUserForm.get("username").setValue(value, { emitEvent: false });
    });

    this.usernameFocus = false;

  }




  onSubmit() {
    console.log(this.govbodyUserForm.value);

    this.isLoading = true;
    this.authService.createGovUser(
      this.govbodyUserForm.get("userType").value,
      this.govbodyUserForm.get("role").value,
      this.govbodyUserForm.get("name").value,
      this.govbodyUserForm.get("username").value.toLowerCase(),
      this.govbodyUserForm.get("password").value

    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
