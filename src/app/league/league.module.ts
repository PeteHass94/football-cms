import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";

//league
import { LeagueCreateComponent } from "./league-create/league-create.component";


@NgModule({
  declarations: [
    LeagueCreateComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]

})
export class LeagueModule {}
