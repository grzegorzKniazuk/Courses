import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Lesson } from 'app/courses/model/lesson';
import { LessonsActions, LessonsActionTypes } from 'app/courses/lessons.actions';
import { adapter } from 'app/courses/course.reducers';

export interface LessonsState extends EntityState<Lesson> {
    loading: boolean;
}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
    const compare = l1.courseId - l2.courseId;
    if (compare !== 0) {
        return compare;
    } else {
        return l1.seqNo - l2.seqNo;
    }
}

export const lessonsAdapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndSeqNo // default sorting
});

const initialLessonsState = adapter.getInitialState({
    loading: false,
});

export function lessonsReducers(state = initialLessonsState, action: LessonsActions): LessonsState {
    switch (action.type) {
        case LessonsActionTypes.LessonsPageCancelled: {
            return {
                ...state,
                loading: false,
            }
        }
        case LessonsActionTypes.LessonsPageRequested: {
            return {
                ...state,
                loading: true,
            }
        }
        case LessonsActionTypes.LessonsPageLoaded: {
            return adapter.addMany(action.payload.lessons, { ...state, loading: false });
        }
        default: {
            return {
                ...state,
            }
        }
    }
}
export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

} = adapter.getSelectors();

