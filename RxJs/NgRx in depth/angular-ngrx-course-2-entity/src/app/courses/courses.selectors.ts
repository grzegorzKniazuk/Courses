import { createFeatureSelector, createSelector } from '@ngrx/store';
import { courseAdapter, coursesReducer, CourseState } from 'app/courses/course.reducers';
import * as fromCourse from './course.reducers';
import { Course } from 'app/courses/model/course'; // import fromCourse.selectAll

export const selectCoursesState = createFeatureSelector<CourseState>("courses"); // feature selector, return complete course state

export const selectCourseById = (courseId: number) => {
  return createSelector(
    selectCoursesState,
    (coursesState: CourseState) => coursesState.entities[courseId] // projection function, get element by id from entities
  )
};

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER'),
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED'),
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length,
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCoursesLoaded,
);
