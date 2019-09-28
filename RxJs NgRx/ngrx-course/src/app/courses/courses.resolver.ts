import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseEntityService } from 'app/courses/services/course-entity.service';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

    constructor(
        private courseEntityService: CourseEntityService,
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.courseEntityService.loaded$.pipe(
            tap((isLoaded) => {
                if (!isLoaded) {
                    this.courseEntityService.getAll();
                }
            }),
            filter(loaded => !!loaded),
            first(),
        );
    }
}
