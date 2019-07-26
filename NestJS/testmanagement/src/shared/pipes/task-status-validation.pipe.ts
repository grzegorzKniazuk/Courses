import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enums';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {

    private readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];


    public transform(value: any, metadata: ArgumentMetadata): TaskStatus {
        value = value.toUpperCase();

        if (this.isStatusValid(value)) {
            return value;
        } else {
            throw new BadRequestException('values is an invalid status');
        }
    }

    private isStatusValid(status: any): boolean {
        return this.allowedStatuses.includes(status);
    }
}
