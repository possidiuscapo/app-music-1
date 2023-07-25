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

  onSelect(album: Album) {
    console.log(album);
  }
}
