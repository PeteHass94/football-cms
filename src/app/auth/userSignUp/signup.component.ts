import { Component, OnDestroy, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";


interface UserType {
  value: string;
  viewValue: string;
}
interface Role {
  value: string;
  viewValue: string;
}
interface Club {
  value: string;
  viewValue: string;
}
interface Team  {
  value: string;
  viewValue: string;
}


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponment implements OnInit, OnDestroy {
  isLoading = false;

  userTypes: UserType[] = [
    {value: 'Gov', viewValue: 'Governing Body'},
    {value: 'League', viewValue: 'League'},
    {value: 'Club', viewValue: 'Club'}
  ];

  roles: Role[] = [
    {value: 'Na', viewValue: 'Na'},
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Manager', viewValue: 'Manager'},
    {value: 'Coach', viewValue: 'Coach'},
    {value: 'Player', viewValue: 'Player'}
  ];

  clubs: Role[] = [
    {value: 'Na', viewValue: 'Na'}
  ];

  teams: Role[] = [
    {value: 'Na', viewValue: 'Na'}
  ];

  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    //this.isLoading = true;
    //this.authService.createUser(form.value.email, form.value.password);

    // .subscribe(response => {
    //   console.log(response);
    //   //error handling
    // }, error => {

    // });
    // this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
