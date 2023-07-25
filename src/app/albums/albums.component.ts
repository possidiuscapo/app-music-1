import { Component } from "@angular/core";
import { Album } from "../album";
import { ALBUMS } from "../mock-albums";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent {
  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum!: Album; // je suis sur qu'une valeur sera passé au moment opportun
  status: string | null = null;

  constructor() {}

  onSelect(album: Album) {
    // console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event: Album) {
    this.status = $event.id;
  }
}
