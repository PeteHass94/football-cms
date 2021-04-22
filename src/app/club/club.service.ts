import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Club } from './club.model';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment.prod";

const BACKEND_URL = environment.apiURL + '/club/';


@Injectable({providedIn: 'root'})
export class ClubService {
  isLoading = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

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

  addTeam(
    // userType: string,
    // role: string,
    // name: string,
    // username: string,
    // club: string,
    // team: string,
    // password: string


  ){
    // const clubQuery = this.httpClient
    //   .post<{
    //     _
    //   }>(BACKEND_URL + 'userid/' + userid);
    return null;
  }

  // //Manager creation
  // createManagerUser(
  //   userType: string,
  //   role: string,
  //   name: string,
  //   username: string,
  //   club: string,
  //   team: string,
  //   password: string
  //   ){
  //   const authData: AuthDataManager = {
  //     userType: userType, role: role, name: name, club: club, team: team,
  //     username: username, password: password}
  //   this.createUser(authData);
  // }
  // createUser(authData: any){
  //   this.httpClient
  //   .post(BACKEND_URL + "/signup", authData)
  //   .subscribe(response => {
  //     //correct enter
  //     this.router.navigate(['/auth/login']);
  //     console.log(response);

  //   }, error => {
  //     //error handling
  //     this.authStatusListener.next(false);
  //   });


}



