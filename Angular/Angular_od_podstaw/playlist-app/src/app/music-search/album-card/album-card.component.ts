import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit {

  @Input() public album;
  constructor() { }

  ngOnInit() {
  }

}
