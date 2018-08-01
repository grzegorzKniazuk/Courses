import {Inject, Injectable, Optional} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  public playlists = [];
  constructor(@Optional() @Inject('PlaylistsData') playlistData) {
    this.playlists = playlistData === null ? this.playlists : playlistData;
  }

  savePlaylist(playlist) {
    if (playlist.id) {
      const index = this.playlists.findIndex(element => {
        return element.id === playlist.id;
      });
      this.playlists.splice(index, 1, playlist);
    } else {
      playlist.id = Date.now();
      this.playlists.push(playlist);
    }
  }

  public createPlaylist(): Object {
    const newPlaylist = {
      name: '',
      tracks: 0,
      color: '#FF0000',
      favourite: false,
    };
    return Object.assign({}, newPlaylist);
  }

  public getPlaylists() {
    return this.playlists;
  }

  public getPlaylist(id: number): Array<any> {
    return this.playlists.find(playlist => playlist.id === id);
  }
}
