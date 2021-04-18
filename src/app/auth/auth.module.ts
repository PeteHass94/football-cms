import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from "../angular-material.module";

//routing
import { AuthRoutingModule } from "./auth-routing.module";

import { LoginComponent } from "./login/login.component";

import { SignupModule } from "./userSignUp/signup.module";

@NgModule({
  declarations: [
    LoginComponent

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SignupModule
  ]
})
export class AuthModule {}
