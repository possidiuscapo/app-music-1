import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';



@NgModule({
  declarations: [
    AlbumComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlbumComponent]
})
export class AdminModule { }
