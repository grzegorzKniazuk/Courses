import { PageQuery } from 'app/courses/lessons.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonsState } from 'app/courses/lessons.reducers';
import * as fromLessons from 'app/courses/lessons.reducers';


export const selectLessonsState = createFeatureSelector<LessonsState>("lessons");

export const selectAllLessons = createSelector(
    selectLessonsState,
    fromLessons.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
    selectAllLessons,
    allLessons => {

        const start = page.pageIndex * page.pageSize;
        const end = start + page.pageSize;

        return allLessons
            .filter(lesson => lesson.courseId === courseId)
            .slice(start, end);
    }
);

export const selectLessonsLoading = createSelector(
    selectLessonsState,
    lessonsState => lessonsState.loading,
);
