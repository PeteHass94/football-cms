
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from "../auth.service";


export type UserType = 'govbody' | 'league' | 'club' | 'manager' | 'player';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
