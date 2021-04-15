import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Component Imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Header
import { HeaderComponent } from './header/header.component';

//Error
import { ErrorComponent } from './error/error.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

//optimising modules
  //angular
import { AngularMaterialModule } from './angular-material.module';
  //posts
import { PostsModule } from './globalPosts/posts.module';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    HttpClientModule,

    AngularMaterialModule,
    PostsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],

  entryComponents: [ErrorComponent]
})
export class AppModule { }
