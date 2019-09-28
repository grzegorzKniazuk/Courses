import { compareCourses, Course } from 'app/courses/model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from 'app/courses/action-types';

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded, (state, { courses }) => {
        return adapter.addAll(courses, {
            ...state,
            allCoursesLoaded: true,
        });
    }),
    on(CourseActions.courseUpdated, (state, { update }) => {
        return adapter.updateOne(update, state);
    }),
);

export const {
    selectAll,
} = adapter.getSelectors();
