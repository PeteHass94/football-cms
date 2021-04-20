import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LeagueService } from "../league.service";
import { AuthService } from "../../auth/auth.service";


interface Club {
  value: string;
  viewValue: string;
}

interface Team {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-league-create',
  templateUrl: './league-create.component.html',
  styleUrls: ['./league-create.component.css']
})
export class LeagueCreateComponent {//} implements OnInit, OnDestroy{
  isLoading = false;
  //govbodyUserForm: any;

  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public LeagueService: LeagueService, public authService: AuthService) {}

  leagueForm: FormGroup;
  teamsList: FormArray;

  addTeam(): void {
    console.log(this.teamsList);
    this.teamsList = this.leagueForm.get('teamsList') as FormArray;
    this.teamsList.push(this.createTeam());
  }
  createTeam(): FormGroup {
    return this.fb.group({
      clubName: [''],
      teamName: [''],
      points: 0
    });
  }

  clubsJSON: JSON;
  clubs: Club[] = [
    {value: 'Na', viewValue: 'Na'}
  ];

  teamsJSON: JSON;
  teams: Team[] = [
    {value: 'firsts', viewValue: 'Firsts'},
    {value: 'seconds', viewValue: 'Seconds'},
    {value: 'thirds', viewValue: 'Thirds'},
    {value: 'u23s', viewValue: 'U23s'},
    {value: 'u21s', viewValue: 'U21s'},
    {value: 'u18s', viewValue: 'U18s'},
    {value: 'u16s', viewValue: 'U16s'},
    {value: 'u14s', viewValue: 'U14s'},
    {value: 'u12s', viewValue: 'U12s'},
    {value: 'u10s', viewValue: 'U10s'}
  ];


  ngOnInit() {

    this.leagueForm = this.fb.group({
      creator: [localStorage.getItem("userId")],
      leagueName: [localStorage.getItem("league")],
      teamsList: this.fb.array([
         this.createTeam()
      ])
    });
    console.log(this.leagueForm.value);

    this.authService.getAllClubs().subscribe(
      (transformedClubData) => {
        this.clubsJSON = transformedClubData.clubs;
        //console.log(this.clubsJSON);
        for (let element in this.clubsJSON) {
          this.clubs.push({
              viewValue: this.clubsJSON[element],
              value: this.clubsJSON[element]
          });
      }
      });



      this.authService.getAllTeams().subscribe(
        (transformedClubData) => {
          this.teamsJSON = transformedClubData.teams;
          //console.log(this.teamsJSON);
          for (let element in this.teamsJSON) {
            this.teams.push({
                viewValue: this.teamsJSON[element],
                value: this.teamsJSON[element]
            });
        }
        });
  }

  selectedClub(index: number, clubName: string) {
    return true;
  }



  onSubmit() {
    console.log(this.leagueForm.value);


  }

  ngOnDestroy() {

  }
}
