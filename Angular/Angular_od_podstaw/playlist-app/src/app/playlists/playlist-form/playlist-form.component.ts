import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from '../playlists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {

  public playlist = null;
  public categories = ['Filmowa', 'Rockowa', 'Inne'];
  constructor(
    private playlistService: PlaylistsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      const id = parseInt(param['id'], 10);
      if (id) {
        const playlist = this.playlistService.getPlaylist(id);
        this.playlist = Object.assign({}, playlist);
      } else {
        this.playlist = this.playlistService.createPlaylist();
      }
    });
  }

  public saveNewPlaylist(valid, playlist): void {
    if (!valid) {
      return;
    }
    this.playlistService.savePlaylist(playlist);
    this.router.navigate(['playlist', playlist.id]);
  }
}
