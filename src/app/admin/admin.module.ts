import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Dans l'AdminModule définition des routes
const routes: Routes = [
  { path: 'admin/add', component: AddAlbumComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ShareModule,
  ],
  declarations: [
    AlbumComponent,
    AddAlbumComponent,
  ],
  exports: [AlbumComponent]
})
export class AdminModule { }
