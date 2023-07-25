import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Album, List } from '../album';
import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
// à chaque "hook" son interface
export class AlbumDetailsComponent implements OnInit, OnChanges {
  @Input() album!: Album; // propriété liée qui sera passée par le parent
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  albumLists: List[] = ALBUM_LISTS;
  songs: string[] | undefined = []; // tableau qui stock la liste des chansons de l'album

  ngOnInit(): void {
  }

  // quand il y a du nouveau
  ngOnChanges(): void {
    if (this.album) {
      this.songs = this.albumLists.find(elem => elem.id === this.album.id)?.list;
      console.log(this.songs);
    }

  }

  play(album: Album) {
    // emettre un album vers le parent
    this.onPlay.emit(album);
  }

}
