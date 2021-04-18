import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData, AuthDataLogin,
  AuthDataGov, AuthDataLeague, AuthDataClub, AuthDataManager, AuthDataPlayer
} from "./auth-data.model";

import { environment } from "../../environments/environment.prod";

const BACKEND_URL = environment.apiURL + '/user';

@Injectable( {providedIn: 'root'})
export class AuthService {

  private isAuthenticated = false;

  private userId: string;

  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  private theUser: AuthData;


  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  //Govbody creation
  createGovUser(
    userType: string,
    role: string,
    name: string,
    username: string,
    password: string
    ){
    const authData: AuthDataGov = { userType: userType, role: role, name: name, username: username, password: password }
    this.createUser(authData);
  }
  //League creation
  createLeagueUser(
    userType: string,
    role: string,
    name: string,
    username: string,
    league: string,
    password: string
    ){
    const authData: AuthDataLeague = { userType: userType, role: role, name: name, league: league, username: username, password: password}
    this.createUser(authData);
  }

  //Club creation
  createClubUser(
    userType: string,
    role: string,
    name: string,
    username: string,
    club: string,
    password: string
    ){
    const authData: AuthDataClub = { userType: userType, role: role, name: name, club: club, username: username, password: password}
    this.createUser(authData);
  }
  //Manager creation
  createManagerUser(
    userType: string,
    role: string,
    name: string,
    username: string,
    club: string,
    team: string,
    password: string
    ){
    const authData: AuthDataManager = {
      userType: userType, role: role, name: name, club: club, team: team,
      username: username, password: password}
    this.createUser(authData);
  }

  createUser(authData: any){
    this.httpClient
    .post(BACKEND_URL + "/signup", authData)
    .subscribe(response => {
      //correct enter
      this.router.navigate(['/auth/login']);
      console.log(response);

    }, error => {
      //error handling
      this.authStatusListener.next(false);
    });
  }

  loginUser(username: string, password: string) {
    const authData: AuthDataLogin = {username: username, password: password};
    this.httpClient
      .post<{ token: string, expiresIn: number, userId: string, user: any }>(BACKEND_URL + "/login", authData)
      .subscribe(response => {
        //console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;

          this.userId = response.userId;
          this.theUser = response.user;

          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

          //this.saveAuthData(token, expirationDate, this.userId);
          this.saveAuthData(token, expirationDate, this.userId, this.theUser);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });


  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation){
      return;
    }
    const now = new Date();

    const expiresIn = (authInformation.expirationDate.getTime() - now.getTime());

    if (expiresIn > 0) {

      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;

      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  logoutUser() {
    this.userId = null;

    this.token = null;
    this.isAuthenticated = false;

    this.authStatusListener.next(false);

    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    this.router.navigate(['/auth/login']);

  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
    //console.log("setting date " + duration);
  }


  private saveAuthData(token: string, expirationDate: Date, userId: string, user: AuthData) {
    console.log(user);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);

    localStorage.setItem('username', user.username);
    localStorage.setItem('userType', user.userType);
    localStorage.setItem('role', user.role);
    localStorage.setItem('name', user.name);

    localStorage.setItem('league', user.league);
    localStorage.setItem('club', user.club);
    localStorage.setItem('team', user.team);
    if(user.dob)
      localStorage.setItem('dob', user.dob.toISOString());
    else
      localStorage.setItem('dob', undefined);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');

    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    localStorage.removeItem('league');
    localStorage.removeItem('club');
    localStorage.removeItem('team');
    localStorage.removeItem('dob');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    const league = localStorage.getItem('league');
    const club = localStorage.getItem('club');
    const team = localStorage.getItem('team');
    const dob = localStorage.getItem('dob');


    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,

      username: username,
      userType: userType,
      role: role,
      name: name,

      league: league,
      club: club,
      team: team,
      dob: dob
    }
  }

  // getUserData(id: string) {
  //   //return{...this.posts.find(p => p.id === id)};
  //   return this.httpClient
  //     .get<{
  //       _id: string
  //     }>(BACKEND_URL + id);
  // }

  getAllClubs(){
    return this.httpClient
         .get<{
          _id: string
        }>(BACKEND_URL + "teams");
  }


}
