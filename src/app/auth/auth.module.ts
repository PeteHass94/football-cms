import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AngularMaterialModule } from "../angular-material.module";

//routing
import { AuthRoutingModule } from "./auth-routing.module";

import { LoginComponent } from "./login/login.component";
import { SignupComponment } from "./userSignUp/signup.component";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponment
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
