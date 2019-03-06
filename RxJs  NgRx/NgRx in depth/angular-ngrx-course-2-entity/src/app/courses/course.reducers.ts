import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from 'app/courses/model/course';
import { CourseActions, CourseActionTypes } from 'app/courses/courses.actions';

/* WITHOUT NGRX-ENTITY
export interface CourseState { // feature state
  entities: {[key:number]: Course}; // way to store entity
  ids: number[]; // id's of coursesEntities
}
*/

// same with ngrx-entity
export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean,
}

export const courseAdapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CourseState = courseAdapter.getInitialState({
  allCoursesLoaded: false,
});

export function coursesReducer(state = initialCoursesState, action: CourseActions): CourseState {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded: {
      return courseAdapter.addOne(action.payload.course, {
        ...state,
        allCoursesLoaded: true,
      }); // uzycie adaptera w reducerze
    }
    case CourseActionTypes.AllCoursesLoaded: {
      return courseAdapter.addAll(action.payload.courses, state); // save all array data to state
    }
      case CourseActionTypes.CourseSaved: {
          return courseAdapter.updateOne(action.payload.course, state); // update one object // upsertOne jesli chcesz zapisac w przypadku gdy obiekt nie istnieje
      }
    default: {
      return {
        ...state,
      }
    }
  }
}

export const {
  selectAll, // Course[]
  selectEntities,
  selectIds,
  selectTotal,
} =  courseAdapter.getSelectors();
