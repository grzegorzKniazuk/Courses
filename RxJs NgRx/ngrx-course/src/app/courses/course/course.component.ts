import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { LessonEntityService } from 'app/courses/services/lesson-entity.service';
import { CourseEntityService } from 'app/courses/services/course-entity.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: [ './course.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {

    course$ = this.courseEntityService.entities$.pipe(
        map(courses => courses.find(course => course.url === this.route.snapshot.paramMap.get('courseUrl'))),
    );

    loading$ = this.lessonEntityService.loading$.pipe(
        delay(0),
    );

    lessons$ = this.lessonEntityService.entities$.pipe(
        withLatestFrom(this.course$),
        tap(([ _, course ]) => {
            if (this.nextPage === 0) {
                this.loadLessonsPage(course);
            }
        }),
        map(([ lessons, course ]) => lessons.filter((lesson) => lesson.courseId === course.id)),
    );

    displayedColumns = [ 'seqNo', 'description', 'duration' ];

    nextPage = 0;

    constructor(
        private courseEntityService: CourseEntityService,
        private lessonEntityService: LessonEntityService,
        private route: ActivatedRoute,
    ) {
    }

    loadLessonsPage(course: Course) {
        this.lessonEntityService.getWithQuery({
            'courseId': course.id.toString(),
            'pageNumber': this.nextPage.toString(),
            'pageSize': '3',
        });

        this.nextPage += 1;
    }
}
