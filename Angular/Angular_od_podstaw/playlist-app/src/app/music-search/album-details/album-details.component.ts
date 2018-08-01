import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { ActivatedRoute } from '@angular/router'; // obiekt ktory reprezentuje juz zaladowana sciezke

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  public album;
  constructor(
    private musicService: MusicSearchService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.musicService
      .getAlbum(this.activatedRoute.snapshot.params['id']) // wyciaganie snapshota z adresu
      .subscribe(album => {
      this.album = album;
    });
  }

}
