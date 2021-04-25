import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


import { ClubService } from "../club.service";
import { AuthService } from "../../auth/auth.service";
import { Club } from '../club.model';
import { Team } from '../../team/team.model';
import { Player } from '../../player/player.model';
import { PlayerService } from 'src/app/player/player.service';




@Component({
  selector: 'app-club-view',
  templateUrl: './club-view.component.html',
  styleUrls: ['./club-view.component.css']
})
export class ClubViewComponent  implements OnInit, OnDestroy{
  refresh() {
    location.reload();
  }
  addPlayerFormVisible = false;
  addTeamFormVisible = false;

  addTeamCounter = 0;
  addTeamForms() {
    this.addTeamCounter++;
  }
  addPlayerCounter = 0;
  addPlayerForms() {
    this.addPlayerCounter++;
  }

  public addPlayerToTeamVisible = false;


  isLoading = false;
  panelOpenState = false;

  private mode = 'view';
  userId: string;
  clubId: string;
  clubName: string;
  public club: Club;
  teamsList: Array<Team> = [];
  managersList: Array<string> = [];
  coachesList: Array<string> = [];

  playersList: Array<Player> = [];

   private authStatusSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public authService: AuthService,
    public clubService: ClubService,
    public playerService: PlayerService
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
          console.log(paramMap);
          this.userId = paramMap.get('userId');
          this.clubService
          .getClubByCreator(this.userId)
          .subscribe(
            (clubData) => {
              console.log(clubData);
              clubData = clubData[0];
              this.isLoading = false;
              this.club = {
                _id: clubData._id,
                creator: clubData.creator,
                clubName: clubData.clubName,
                teams: clubData.teams,
                players: clubData.players
              };
              this.clubService.setClub(this.club);
              this.clubName = this.clubService.getClubName();
              this.clubId = this.club._id;
          });

          this.clubService.getTeamsByUserId(this.userId)
          .subscribe(
            (teamsData) => {

              teamsData.teams.forEach(team => {
                this.teamsList.push(team);

              });
            }
          );
          this.clubService.getPlayersByUserId(this.userId)
          .subscribe(
            (playersData) => {
              playersData.players.forEach(element => {
                this.playersList.push(element);
              });
            }
          );
      }
    })

  }

  addTeam() {
    console.log(this.clubId);

  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
