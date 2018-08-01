import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from '../music-search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-album-search-form',
  templateUrl: './album-search-form.component.html',
  styleUrls: ['./album-search-form.component.css']
})
export class AlbumSearchFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private musicSearchService: MusicSearchService) {
    this.searchForm = new FormGroup({
      'query': new FormControl('Batman'),
    });

    this.searchForm.get('query') // get pobiera warosc konkretnej kontrolki
      .valueChanges
      .pipe(filter(query => query.length > 3)) // 3 litery, minimalna dlugosc zapytania
      .pipe(distinctUntilChanged()) // czy wartosc sie zmienila
      .pipe(debounceTime(400)) // czas od ostatniego wcisniecia przycisku
      .subscribe(query => {
        this.musicSearchService.search(query);
    });
  }

  ngOnInit() {
  }
}
