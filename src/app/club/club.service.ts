import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Club } from './club.model';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment.prod";

const BACKEND_URL = environment.apiURL + '/posts/';


@Injectable({providedIn: 'root'})
export class ClubService {
  isLoading = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  //createLeague
  createLeague(
    creator: string,
    leagueName: string,
    teams: [{
      team: {
        clubName: string,
        teamName: string,
        points: number
      }
    }]
  ) {
    //const leagueData: League = { creator: creator, leagueName: leagueName, teams: [{ team: {clubName, teamName, points }}]}
  }

}
