import { Component, OnDestroy, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;

  private authStatusSub: Subscription;



  constructor(public authService: AuthService) {}


  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

  }

  onLogin(form: NgForm) {
    //console.log(form.value);
    // if (form.invalid) {
    //   return;
    // }
    this.isLoading = true;
    form.value.username = "peter1994";
    form.value.password = "password";
    this.authService.loginUser(form.value.username.toLowerCase(), form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
