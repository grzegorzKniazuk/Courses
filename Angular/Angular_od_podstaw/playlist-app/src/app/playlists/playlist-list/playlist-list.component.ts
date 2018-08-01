import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  @Input() public playlists;
  @Input() public selected;
  @Output('selectPlaylist') public onSelectedPlaylist = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public selectPlaylist(playlist): void {
    this.onSelectedPlaylist.emit(playlist);
  }

}
