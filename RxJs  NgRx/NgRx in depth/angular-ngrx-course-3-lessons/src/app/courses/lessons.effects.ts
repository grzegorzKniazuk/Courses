import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LessonsActionTypes, LessonsPageCancelled, LessonsPageLoaded, LessonsPageRequested } from 'app/courses/lessons.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CoursesService } from 'app/courses/services/courses.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { of } from 'rxjs';

@Injectable()
export class LessonsEffects {

    @Effect({ dispatch: true })
    public loadLessonsPage$ = this.actions$.pipe(
        ofType<LessonsPageRequested>(LessonsActionTypes.LessonsPageRequested),
        mergeMap(({ payload }) => {
            return this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize).pipe(
                catchError((error) => { // error handling - correct way, tutaj poniewaz w glownym strumieniu blad "zawiesil" by effect'a az do przeladowania aplikacji
                    console.log(error);
                    this.store.dispatch(new LessonsPageCancelled());

                    return of([]); // pusta tablica w momencie gdy wystapi blad

                })
            )
        }), // fetch data from backend,
        map(lessons => new LessonsPageLoaded({ lessons })),
    );

    constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}
}
