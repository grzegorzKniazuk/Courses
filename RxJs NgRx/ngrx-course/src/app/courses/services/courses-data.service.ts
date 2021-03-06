import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Course } from 'app/courses/model/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
    ) {
        super('Course', http, httpUrlGenerator);
    }

    public getAll(): Observable<Course[]> {
        return this.http.get('/api/courses').pipe(
            pluck('payload'),
        );
    }
}
