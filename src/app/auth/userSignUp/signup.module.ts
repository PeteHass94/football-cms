import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { ClubSignupComponent } from "./clubSignup/clubsignup.component";
import { GovbodySignupComponent } from "./govbodySignup/govbodysignup.component";
import { LeagueSignupComponent } from "./leagueSignup/leaguesignup.component";
import { ManagerSignupComponent } from "./managerSignup/managersignup.component";
import { PlayerSignupComponent } from "./playerSignup/playerSignup.component";


import { SignupComponent } from "./signup.component";

@NgModule ({
  declarations: [
    SignupComponent,

    GovbodySignupComponent,
    LeagueSignupComponent,
    ClubSignupComponent,
    ManagerSignupComponent,
    PlayerSignupComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignupModule {}
