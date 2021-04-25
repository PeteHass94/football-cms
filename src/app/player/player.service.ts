import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

import { environment } from "../../environments/environment.prod";
import { Player } from './player.model';


const BACKEND_URL = environment.apiURL + '/player/';


@Injectable({providedIn: 'root'})
export class PlayerService {

  isLoading = false;

  private thePlayer: Player;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {}

  getPlayerByPlayerId(playerId: string) {
    //return{...this.posts.find(p => p.id === id)};
    const playerQuery = this.httpClient
    .get<{
      player: Player
    }>(BACKEND_URL + 'playerid/' + playerId);

    return playerQuery;
  }

  //"/teamid/:id",
  getPlayersByTeamId(teamId: string) {
    const playerQuery = this.httpClient
    .get<{
      players: Player[];
    }>(BACKEND_URL + 'teamid/' + teamId);

    return playerQuery;
  }

  //"/teamid/:teamid/playerid/:playerid"
  pushTeamIdToPlayer(playerId: string, teamId: string){
    const idsPlayerAndTeam = [{ aplayerid: playerId, ateamid: teamId}];

    const clubQuery = this.httpClient.put(BACKEND_URL + 'push/teamid/' + teamId +'/playerid/' + playerId, idsPlayerAndTeam);

    return clubQuery;
  }


}
