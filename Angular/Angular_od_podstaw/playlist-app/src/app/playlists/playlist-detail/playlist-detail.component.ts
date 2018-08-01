import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from '../playlists.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {

  public playlist;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      const id = parseInt(param['id'], 10);
      if (id) {
        this.playlist = this.playlistsService.getPlaylist(id);
      }
    });
  }
  public editPlaylist(playlist): void {
    this.router.navigate(['playlist', playlist.id, 'edit']);
  }

}
