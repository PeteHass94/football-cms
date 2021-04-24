import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { ClubViewComponent } from "./club/club-view/club-view.component";
import { PostCreateComponent } from "./globalPosts/post-create/post-create.component";
import { PostListComponent } from "./globalPosts/post-list/post-list.component";
import { LeagueCreateComponent } from "./league/league-create/league-create.component";

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  { path: 'club/:userId', component: ClubViewComponent},
  { path: 'league/create', component: LeagueCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
