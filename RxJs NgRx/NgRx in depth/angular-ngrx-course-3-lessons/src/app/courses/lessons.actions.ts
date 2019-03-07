import { Action } from '@ngrx/store';
import { Lesson } from 'app/courses/model/lesson';

export enum LessonsActionTypes {
    LessonsPageRequested = '[Course Landing Page] Lessons Page Requested',
    LessonsPageLoaded = '[Courses API] Lessons Page Loaded',
    LessonsPageCancelled = '[Courses API] Lessons Page Cancelled'
}

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export class LessonsPageRequested implements Action {

    readonly type = LessonsActionTypes.LessonsPageRequested;

    constructor(public payload: { courseId: number, page: PageQuery }) {
    }
}

export class LessonsPageLoaded implements Action {

    readonly type = LessonsActionTypes.LessonsPageLoaded;

    constructor(public payload: { lessons: Lesson[] }) {
    }
}

export class LessonsPageCancelled implements Action {

    readonly type = LessonsActionTypes.LessonsPageCancelled;
}

export type LessonsActions =
    LessonsPageRequested
    | LessonsPageLoaded
    | LessonsPageCancelled;




