import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.css']
})
export class TracklistComponent {

  @Input() public tracks;

  constructor() { }
  public play(track, id): void {
    id.volume = 0.1;
    if (id.src !== track.preview_url) {
      id.src = track.preview_url;
      id.play();
    } else if (id.paused) {
      id.play();
    } else {
      id.pause();
    }
  }
}
