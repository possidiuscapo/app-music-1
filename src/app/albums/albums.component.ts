import { Component, OnInit } from "@angular/core";
import { Album } from "../album";
import { AlbumService } from "../album.service";
import { fadeInAnimation } from "../animation.module";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  animations: [fadeInAnimation]
})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = [];
  selectedAlbum: Album| undefined; // je suis sur qu'une valeur sera passé au moment opportun
  status: string | null = null;

  constructor(
    private albumService: AlbumService
  ) {
    console.log(`${this.albumService.count()} albums trouvés`);
  }

  ngOnInit(): void {
    this.albums = this.albumService.paginate(0, this.albumService.paginateNumberPage());
              // .order((a: Album, b: Album) => a.duration - b.duration) // ordonne les albums
              // .limit(0, this.albumService.paginateNumberPage()) // renvoyer une sous-partie
              // .getAlbums(); // recupère les albums
  }

  onSelect(album: Album) {
    // console.log(album);
    this.selectedAlbum = album;
  }

  playParent(event: Album) {
    this.status = event.id;
    console.log(event);
    // appelle de la méthode switchOn
    this.albumService.switchOn(event);
  }

  search($event: Album[]) {
    if ($event) {
      this.albums = $event;
    }
  }

  resetSelectedAlbum() {
    this.selectedAlbum = undefined;
  }

  onSetPaginate($event: {start: number, end: number}) {
    // Récupérer les albums compris entre [start et end]
    this.albums = this.albumService.paginate($event.start, $event.end);
  }
}
