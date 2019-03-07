import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {AppState} from 'app/reducers';
import {select, Store} from "@ngrx/store";
import {filter, first, tap} from "rxjs/operators";
import { selectCourseById } from 'app/courses/courses.selectors';
import { CourseRequested } from 'app/courses/courses.actions';



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        return this.store.pipe(
          select(selectCourseById(route.params['id'])),
          tap(course => { // no course in the store
            if (!course) {
              this.store.dispatch(new CourseRequested({ courseId: route.params['id'] }));
            }
          }),
          filter(course => !!course),
          first() // musimy zakonczyc observable, w przeciwnym wypadku nie przejdziemy na docelowa sciezke
        );
    }
}

