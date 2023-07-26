import { Component, OnInit } from "@angular/core";
import { Album } from "../album";
import { AlbumService } from "../album.service";
import { ALBUMS } from "../mock-albums";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = [];
  selectedAlbum!: Album; // je suis sur qu'une valeur sera passé au moment opportun
  status: string | null = null;

  constructor(
    private albumService: AlbumService
  ) {
    console.log(`${this.albumService.count()} albums trouvés`);
  }

  ngOnInit(): void {
    this.albums = this.albumService.paginate(0, this.albumService.count());
  }

  onSelect(album: Album) {
    // console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event: Album) {
    this.status = $event.id;
  }
}
