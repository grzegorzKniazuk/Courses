import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CoursesService} from "../services/courses.service";
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    // store is a Observable! Observables are instances of application state
    // store is a centralized Singleton service that acts as an in-memory database its going to contain all our application state
    constructor(private coursesService: CoursesService, private store: Store<AppState>) {
      // store.dispatch(actionName); // action call, store react to action by event and response to that produce a new version of the application state
    }

    ngOnInit() {

        const courses$ = this.coursesService.findAllCourses();

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
