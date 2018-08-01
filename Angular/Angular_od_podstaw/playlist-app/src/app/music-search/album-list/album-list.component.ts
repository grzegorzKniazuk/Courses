import { Component, OnInit } from '@angular/core';
import {MusicSearchService} from '../music-search.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  public albums;

  constructor(private musicSearch: MusicSearchService) {}

  ngOnInit() {
    this.albums = this.musicSearch.getAlbumsStream();
  }
}
