import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Club } from './club.model';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment.prod";
import { ClubViewModule } from './club-view/club-view.module';
import { Team } from '../team/team.model';
import { Player } from '../player/player.model';
import { PlayerService } from '../player/player.service';
import { TeamService } from '../team/team.service';

const BACKEND_URL = environment.apiURL + '/club/';


@Injectable({providedIn: 'root'})
export class ClubService {
  isLoading = false;

  private theClub: Club;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public playerService: PlayerService,
    public teamService: TeamService
    ) {}



  getClubByCreator(userid: string) {
    //return{...this.posts.find(p => p.id === id)};
    const clubQuery = this.httpClient
      .get<{
        _id: string,
        clubName: string,
        creator: string,
        teams: [{type: string}],
        players: [{type: string}]
      }>(BACKEND_URL + 'userid/' + userid);

    return clubQuery;

  }

  setClub(club: Club) {
    this.theClub = club;
  }
  getClub() {
    return this.theClub;
  }

  getClubName() {
    return this.theClub.clubName;
  }

  getTeams() {
    return this.theClub.teams;
  }

  //getTeams by userid
  getTeamsByUserId(userId: string) {

    const clubQuery = this.httpClient
     .get<{ teams: Array<Team>}>
     (BACKEND_URL + 'userid/' + userId + '/teams');

    return clubQuery;
  }

  //getTeams by userid
  getPlayersByUserId(userId: string) {
    const clubQuery = this.httpClient
     .get<{ players: Array<Player>}>
     (BACKEND_URL + 'userid/' + userId + '/players');

    return clubQuery;
  }

  addPlayerToTeamByIds(playerId: string, teamId: string) {
    //"/addplayer/:playerid/toteam/:teamid",

    const idsPlayerAndTeam = [{ playerid: playerId, teamid: teamId}];

    const clubQuery = this.httpClient
     .put
     (BACKEND_URL + 'addplayer/' + playerId + '/toteam/' + teamId,
      idsPlayerAndTeam);

    return clubQuery;
  }

  getPlayersFromTeamId(teamId: string) {
    console.log(teamId);

    return this.playerService.getPlayersByTeamId(teamId);
  }

}



