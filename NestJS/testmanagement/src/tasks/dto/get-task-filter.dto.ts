import { TaskStatus } from '../../shared/enums';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTaskFilterDto {

    @IsOptional()
    @IsIn([ TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE ])
    public readonly status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    public readonly search: string;
}
