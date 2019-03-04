import { Action } from '@ngrx/store';
import { Course } from 'app/courses/model/course';

export enum CourseActionTypes {
  CourseRequested = '[View Course Page] Course Requested', // source of the action / event that is linket to this action - przyjeta konwencja
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Course Homepage] All Course Requested',
  AllCoursesLoaded = '[Courses API] All Course Loaded',
}

// ngrx entity to define the state of the course collection type


export class CourseRequested implements Action {
  public readonly type = CourseActionTypes.CourseRequested;

  constructor(public payload: { courseId: number }) {}
}

export class CourseLoaded implements Action {
  public readonly type = CourseActionTypes.CourseLoaded;

  constructor(public payload: { course: Course }) {}
}

export class AllCoursesRequested implements Action {
  public readonly type = CourseActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  public readonly type = CourseActionTypes.AllCoursesLoaded;

  constructor(public payload: { courses: Course[] }) {}
}

export type CourseActions = CourseRequested | CourseLoaded | AllCoursesRequested | AllCoursesLoaded;
