import { Component, OnInit, Inject } from '@angular/core';
import { PlaylistsService} from './playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  public selected = null;
  public edited = {};
  public playlists = [];
  public mode = 'none';

  constructor(public playlistsService: PlaylistsService) {}

  public ngOnInit(): void {
    this.playlists = this.playlistsService.getPlaylists();
  }

  public select(playlist): void {
    if (playlist !== this.selected) {
      this.mode = 'selected';
      this.selected = playlist;
    }
  }

  public editPlaylist(playlist): void {
    this.mode = 'edit';
    this.edited = Object.assign({}, playlist);
    this.selected = playlist;
  }

  public createNewPlaylist(): void {
    this.mode = 'edit';
    const newPlaylist = this.playlistsService.createPlaylist();
    this.selected = newPlaylist;
    this.edited = newPlaylist;
  }

  public saveNewPlaylist(playlist): void {
    this.playlistsService.savePlaylist(playlist);
  }
}
