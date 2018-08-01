import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'posts-filter',
  template: `
    <div class="mb-4">
      <input type="text" autofocus="" class="form-control" [value]="query" (input)="filter($event.target.value)" placeholder="Filter posts ...">
    </div>
  `,
  styles: []
})
export class PostsFilterComponent implements OnInit {

  constructor() { }

  @Input()
  query = ''

  @Output()
  queryChange = new EventEmitter()

  filter(query){
    this.queryChange.emit(query)
  }

  ngOnInit() {
  }

}
