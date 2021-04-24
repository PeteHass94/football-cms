import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from "@angular/router";

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


import { ClubService } from "../club.service";
import { AuthService } from "../../auth/auth.service";
import { Club } from '../club.model';
import { Team } from '../../team/team.model';



@Component({
  selector: 'app-club-view',
  templateUrl: './club-view.component.html',
  styleUrls: ['./club-view.component.css']
})
export class ClubViewComponent  implements OnInit, OnDestroy{
  addTeamFormVisible = false;
  isLoading = false;
  panelOpenState = false;
  //govbodyUserForm: any;

  private mode = 'view';
  userId: string;
  clubId: string;
  clubName: string;
  public club: Club;
  teamsList: Array<Team> = [];

  private authStatusSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public authService: AuthService,
    public clubService: ClubService
    ) {}



  ngOnInit() {

    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
          this.userId = paramMap.get('userId');
          this.clubService
          .getClubByCreator(this.userId)
          .subscribe(
            (clubData) => {
              clubData = clubData[0];
              this.isLoading = false;
              this.club = {
                id: clubData._id,
                creator: clubData.creator,
                clubName: clubData.clubName,
                teams: clubData.teams,
                players: clubData.players
              };
              this.clubService.setClub(this.club);
              this.clubName = this.clubService.getClubName();
              this.clubId = this.club.id;

          });

          this.clubService.getTeamsByUserId(this.userId)
          .subscribe(
            (teamsData) => {
              console.log(teamsData);
              teamsData.teams.forEach(element => {
                this.teamsList.push(element);
              });
              console.log(this.teamsList);
            }
          )
      }
    })

  }

  addTeam() {
    console.log(this.clubId);
    //this.clubService.addTeam(this.clubId);
  }




  onSubmit() {



  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
