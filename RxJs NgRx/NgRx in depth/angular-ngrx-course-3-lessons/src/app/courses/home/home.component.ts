import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'app/reducers';
import { select, Store } from '@ngrx/store';
import { selectAllCourses } from '../course.selectors';
import { AllCoursesRequested } from '../course.actions';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {

        this.store.dispatch(new AllCoursesRequested());

        const courses$ = this.store
          .pipe(
            select(selectAllCourses)
          );

        this.beginnerCourses$ = courses$.pipe(
          map(courses => courses.filter(course => course.category === 'BEGINNER') )
        );

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED') )
        );

        this.promoTotal$ = courses$.pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

    }

}
