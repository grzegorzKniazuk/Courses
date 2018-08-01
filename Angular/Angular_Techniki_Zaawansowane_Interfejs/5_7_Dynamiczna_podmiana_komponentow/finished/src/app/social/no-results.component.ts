import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'no-results',
  template: `
    <div class="card mb-4">
      <div class="card-body">
        <p class="card-text text-center text-mute">No Results</p>
      </div>
    </div>
  `,
  styles: []
})
export class NoResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
