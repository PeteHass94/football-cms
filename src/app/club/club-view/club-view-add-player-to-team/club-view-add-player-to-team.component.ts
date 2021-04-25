import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/player/player.model';
import { PlayerService } from 'src/app/player/player.service';
import { Team } from 'src/app/team/team.model';
import { TeamService } from 'src/app/team/team.service';

import { AuthService } from "../../../auth/auth.service";
import { ClubService } from '../../club.service';


@Component({
  selector: 'app-club-view-add-player-to-team',
  templateUrl: './club-view-add-player-to-team.component.html',
  styleUrls: ['./club-view-add-player-to-team.component.css']
})
export class ClubViewAddTeamToTeamComponent implements OnInit, OnDestroy{
  @Input()
  selectedTeam: Team;

  userId: string;
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  playersList: Array<Player> = [];
  selectedPlayers: Array<Player> =[];


  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public authService: AuthService,
    public clubService: ClubService,
    public teamService: TeamService,
    public playerService: PlayerService,
    private router: Router,
    private _snackBar: MatSnackBar) {}


    ngOnInit() {
      console.log("this.selectedTeam.id");
      console.log(this.selectedTeam._id);
      //console.log(this.clubService.getClub());

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
        }
      });

      this.clubService.getPlayersByUserId(this.userId)
          .subscribe(
            (playersData) => {
              playersData.players.forEach(element => {
                this.playersList.push(element);
              });
              console.log(this.playersList);
            }
          );

    }



    confirm() {


      this.selectedPlayers.forEach(selectedPlayer => {

        if(this.selectedTeam.players.indexOf(selectedPlayer._id) < 0){

          this.clubService.addPlayerToTeamByIds(selectedPlayer._id, this.selectedTeam._id)
          .subscribe(() => {});
          console.log("player(s) added to team");
        }
        location.reload();

        this._snackBar.open(
          "Players Added to " + this.selectedTeam.teamName,
         'Hide', {
          duration: 3000
        });

      });


    }

    // confirm() {
    //   //console.log(this.selectedPlayers);

    //   this.selectedPlayers.forEach(selectedPlayer => {
    //     // console.log(selectedPlayer._id);
    //     // let selectedPlayerId = selectedPlayer[0]._id;
    //     // console.log(selectedPlayerId);
    //     if(this.selectedTeam.players.indexOf(selectedPlayer._id) < 0){
    //       this.clubService.addPlayerToTeamByIds(selectedPlayer._id, this.selectedTeam._id)
    //       .subscribe(() => {});
    //       console.log("player added to team");
    //     }
    //     //location.reload();

    //     this._snackBar.open(
    //       "Players Added to " + this.selectedTeam.teamName,
    //      'Hide', {
    //       duration: 3000
    //     });

    //   });


    // }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
}
