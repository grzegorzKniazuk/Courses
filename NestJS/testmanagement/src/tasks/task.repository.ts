import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto, GetTaskFilterDto } from './dto';
import { TaskStatus } from '../shared/enums';
import { UserEntity } from '../auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

    private readonly logger = new Logger('TaskRepository');

    public async getTasks(filterDto: GetTaskFilterDto, user: UserEntity): Promise<TaskEntity[]> {
        const { status, search } = filterDto;

        const queryBuilder = this.createQueryBuilder('task');

        queryBuilder.where('task.userId = :userId', { userId: user.id });

        if (status) {
            queryBuilder.andWhere('task.status = :status', { status });
        }

        if (search) {
            queryBuilder.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` }); // % - wyszukaj czesc frazy
        }

        try {
            return await queryBuilder.getMany();
        } catch (e) {
            this.logger.error(`Failed to get tasks for user "${user.username}, DTO: ${JSON.stringify(filterDto)}`, e.stack);
            throw new InternalServerErrorException();
        }
    }


    public async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
        const { title, description } = createTaskDto;

        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
        } catch (e) {
            this.logger.error(`Failed to create task for user "${user.username}, DTO: ${JSON.stringify(createTaskDto)}`, e.stack);
        }

        delete task.user;
        return task;
    }
}
