import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Album, List, SortAlbumCallback } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private & protected
  private _albumList: List[] = ALBUM_LISTS;
  private _subjectAlbum = new Subject<Album>();

  public get subjectAlbum() {
    return this._subjectAlbum;
  }

  // Observable qui notifie aux abonné la page actuelle
  sendCurrentNumberPage = new Subject<number>();

  constructor() { }

  /**
   * Fonction de recherche de tous les albums
   * @returns Retourne la liste de tous les albums
   */
  getAlbums(): Album[] {
    return this._albums.sort((a: Album, b: Album) => b.duration - a.duration);
  }

  /**
   * Fonction de recherche d'un album particulier
   * @param id identifiant de l'album à rechercher
   * @returns Retourne l'album correspondant; undefined si aucun identifiant ne correspond
   */
  getAlbum(id: string): Album | undefined {
    return this._albums.find(album => album.id === id);
  }

  /**
   * Fonction de recherche des sons d'un albums
   * @param id identifiant de l'album à rechercher
   * @returns La référence sera retourné si elle existe; undefined si l'id n'existe pas dans la liste.
   */
  getAlbumList(id: string): string[] | undefined {
    return this._albumList.find(list => list.id === id)?.list;
  }

  /**
   * Fonction qui retourne le nombre d'albums
   * @returns Le nombre d'albums
   */
  count(): number {
    return this._albums.length;
  }


  order(callback: SortAlbumCallback): AlbumService {
    this._albums.sort(callback);
    return this; // retourne le service pour permettre le chainage de méthodes
  }

  limit(start: number, end: number): AlbumService {
    this._albums = this._albums.slice(start, end)
    return this; // retourne le service pour permettre le chainage de méthodes
  }

  paginate(start: number, end: number): Album[] {
    return this.getAlbums().slice(start, end);
  }

  search(word: string): Album[] {
    return this._albums
      .filter(album => {
        return album.title
          .toLowerCase()
          .includes(word.trim().toLowerCase());
      });
  }

  searchV2(word: string): Album[] {
    let re = new RegExp(word.trim(), "g");
    return this._albums.filter(album => album.title.match(re));
  }

  shuffle(songs: string[]) {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    return songs;
  }

  /**
   * Méthode qui renvoi le nombre d'album qu'on
   * aura par page
   */
  paginateNumberPage(): number {
    return environment.numberPage;
  }

  /**
   * Méthode qui signale à tous les composants
   * la page actuelle
  * @param numberPage numéro de la page actuelle
   * @returns
   */
  currentPage(numberPage: number) {
    return this.sendCurrentNumberPage.next(numberPage);
  }

  /**
   * Méthode mettant le status d'un album à "on"
   */
  switchOn(album: Album) {
    this._albums.forEach((a: Album) => {
      if (a.ref === album.ref) {
        album.status = 'on';
      } else {
        album.status = 'off';
      }
    });
    this.subjectAlbum.next(album);
  }
  /**
   * Méthode mettant le status d'un album à "off"
   */
  switchOff(album: Album) {
    this._albums.forEach((a: Album) => {
      a.status = "off";
    });
  }
}
