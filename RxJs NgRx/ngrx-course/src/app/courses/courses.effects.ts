import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseActions } from 'app/courses/action-types';
import { CoursesHttpService } from 'app/courses/services/courses-http.service';
import { concatMap, map } from 'rxjs/operators';
import { allCoursesLoaded } from 'app/courses/courses.actions';

@Injectable()
export class CoursesEffects {

    public loadCourses$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(CourseActions.loadAllCourses),
                concatMap(action => this.coursesHttpService.findAllCourses()),
                map(courses => allCoursesLoaded({ courses })),
            );
        },
    );

    public courseUpdated$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(CourseActions.courseUpdated),
                concatMap(({ update }) => this.coursesHttpService.saveCourse(
                    update.id,
                    update.changes,
                )),
            );
        }, { dispatch: false },
    );

    constructor(
        private actions$: Actions,
        private coursesHttpService: CoursesHttpService,
    ) {
    }
}
