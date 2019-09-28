import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material';
import { CourseEntityService } from 'app/courses/services/course-entity.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

    promoTotal$ = this.courseEntityService.entities$.pipe(map(courses => courses.filter(course => course.promo).length));

    beginnerCourses$ = this.courseEntityService.entities$.pipe(map(courses => courses.filter(course => course.category === 'BEGINNER')));

    advancedCourses$ = this.courseEntityService.entities$.pipe(map(courses => courses.filter(course => course.category === 'ADVANCED')));

    constructor(
        private dialog: MatDialog,
        private courseEntityService: CourseEntityService,
    ) {
    }

    onAddCourse() {

        const dialogConfig = defaultDialogConfig();

        dialogConfig.data = {
            dialogTitle: 'Create Course',
            mode: 'create',
        };

        this.dialog.open(EditCourseDialogComponent, dialogConfig);

    }

}
