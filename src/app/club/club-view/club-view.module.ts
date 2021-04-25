import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { ClubViewAddTeamToTeamComponent } from "./club-view-add-player-to-team/club-view-add-player-to-team.component";
import { ClubViewAddPlayerComponent } from "./club-view-add-player/club-view-add-player.component";
import { ClubViewAddTeamComponent } from "./club-view-add-team/club-view-add-team.component";
import { ClubViewSeePlayersComponent } from "./club-view-see-players/club-view-see-players.component";
import { ClubViewComponent } from "./club-view.component";



@NgModule ({
  declarations: [
    ClubViewComponent,
    ClubViewAddTeamComponent,
    ClubViewAddPlayerComponent,
    ClubViewAddTeamToTeamComponent,
    ClubViewSeePlayersComponent

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClubViewModule {}
