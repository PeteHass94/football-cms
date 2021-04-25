import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AngularMaterialModule } from "../angular-material.module";

//posts
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostClubComponent } from "./post-club/post-club.component";



@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostClubComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]

})
export class PostsModule {}
