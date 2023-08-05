import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  /** variable allowing the component to be displayed or not */
  showplayer: boolean = false;
  /** Number representing the current song played in album */
  current: number = 1;
  /** Variable representing the total number of songs */
  total: number = 1;
  /** Variable representing the percentage of the total album played */
  ratio: number = 0;
  /** Variable representing the currently played album */
  albumPlay!: Album;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.subjectAlbum.subscribe({
      next: (album: Album) => {
        this.albumPlay = album;
        this.showplayer = true;
        this.current = 1;
        let duration = this.albumPlay.duration; // each song takes 2min
        this.total = Math.floor(duration / 120);
        this.ratio = Math.floor(100 / this.total);
        let step = this.ratio;

        const timer = (120 * 1000);

        // change song every 2min
        const player = setInterval(() => {
          this.current++;
          this.ratio += step;
          console.log(this.ratio);
          if(this.ratio > 100) {
            clearInterval(timer);
            this.showplayer = false;
            this.albumService.switchOff(this.albumPlay);
          }
        }, timer);
      }
    });
  }
}
