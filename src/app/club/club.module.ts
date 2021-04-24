import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";

//Club
import { ClubViewModule } from "./club-view/club-view.module";


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,

    ClubViewModule

  ]

})
export class ClubModule {}
