import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ClubService } from "../club.service";
import { AuthService } from "../../auth/auth.service";





@Component({
  selector: 'app-club-view',
  templateUrl: './club-view.component.html',
  styleUrls: ['./club-view.component.css']
})
export class ClubViewComponent  implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) {}


  ngOnInit() {


  }





  onSubmit() {



  }

  ngOnDestroy() {

  }
}
