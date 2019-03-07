import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AllCoursesLoaded, AllCoursesRequested, CourseActionTypes, CourseLoaded, CourseRequested } from 'app/courses/courses.actions';
import { CoursesService } from 'app/courses/services/courses.service';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { Course } from 'app/courses/model/course';
import { AppState } from 'app/reducers';
import { allCoursesLoaded } from 'app/courses/courses.selectors';

@Injectable()
export class CoursesEffects {

  @Effect({ dispatch: true })
  public requestCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CourseRequested>(CourseActionTypes.CourseRequested),
    mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)), // load data from backend
    map((course: Course) => new CourseLoaded({ course })), // save to store
  );

  @Effect({ dispatch: true })
  public loadAllCourses$: Observable<Action> = this.actions$.pipe(
    ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
    withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
    filter(([action, isAllCoursesLoaded]) => !allCoursesLoaded), // tylko gdy dane nie sa zaladowane
    mergeMap(() => this.coursesService.findAllCourses()), // load data from backend
    map((courses: Course[]) => new AllCoursesLoaded({ courses })), // save to store
  );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private coursesService: CoursesService) {}
}
