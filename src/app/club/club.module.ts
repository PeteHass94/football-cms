import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";

//Club
import { ClubViewComponent } from "./club-view/club-view.component";


@NgModule({
  declarations: [
    ClubViewComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]

})
export class LeagueModule {}
