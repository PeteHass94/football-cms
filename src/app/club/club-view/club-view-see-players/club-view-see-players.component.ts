import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/player/player.model';
import { Team } from 'src/app/team/team.model';

import { AuthService } from "../../../auth/auth.service";
import { ClubService } from '../../club.service';



@Component({
  selector: 'app-club-view-see-players',
  templateUrl: './club-view-see-players.component.html',
  styleUrls: ['./club-view-see-players.component.css']
})
export class ClubViewSeePlayersComponent implements OnInit, OnDestroy{
  @Input()
  selectedTeam: Team;

  isLoading = false;

  teamPlayerList: Array<Player> = [];


  private authStatusSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public clubService: ClubService,
    ) {}




  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.clubService.getPlayersFromTeamId(this.selectedTeam._id)
    .subscribe(playersData => {
      console.log(playersData.players);
      playersData.players.forEach(player => {
        this.teamPlayerList.push(player);
      });
      //this.teamPlayerList.push(playersData[0].players);
    });

    console.log(this.teamPlayerList);
  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
