import { NgModule } from "@angular/core";

//Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
//  imports: [
//   MatIconModule,
//   MatInputModule,
//   MatCardModule,
//   MatButtonModule,
//   MatToolbarModule,
//   MatExpansionModule,
//   MatProgressSpinnerModule,
//   MatPaginatorModule,
//   MatDialogModule
//  ],
 exports: [
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
 ]
})
export class AngularMaterialModule {

}
