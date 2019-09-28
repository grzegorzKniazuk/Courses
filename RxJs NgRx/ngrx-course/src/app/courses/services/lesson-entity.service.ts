import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Lesson } from 'app/courses/model/lesson';
import { Injectable } from '@angular/core';

@Injectable()
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
    constructor(
        entityCollectionServiceElementsFactory: EntityCollectionServiceElementsFactory,
    ) {
        super('Lesson', entityCollectionServiceElementsFactory);
    }
}
