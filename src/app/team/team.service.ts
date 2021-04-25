import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

import { environment } from "../../environments/environment.prod";
import { Team } from './team.model';



const BACKEND_URL = environment.apiURL + '/team/';


@Injectable({providedIn: 'root'})
export class TeamService {

  isLoading = false;

  private theTeam: Team;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {}

  getTeamByTeamId(teamId: string) {
  //return{...this.posts.find(p => p.id === id)};
  const playerQuery = this.httpClient
  .get<{
    team: Team
  }>(BACKEND_URL + 'teamid/' + teamId);

  return playerQuery;
  }

  //"/teamid/:teamid/playerid/:playerid",
  pushPlayerIdToTeam(playerId: string, teamId: string){
    const idsPlayerAndTeam = [{ aplayerid: playerId, ateamid: teamId}];

    const teamQuery = this.httpClient.put('push/teamid/' + teamId +'/playerid/' + playerId, idsPlayerAndTeam);

    return teamQuery;
  }

}
