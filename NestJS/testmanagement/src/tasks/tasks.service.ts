import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto, GetTaskFilterDto } from './dto';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from '../shared/enums';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository,
    ) {
    }

    public async getTasks(filterDto: GetTaskFilterDto, user: UserEntity): Promise<TaskEntity[]> {
        try {
            return await this.taskRepository.getTasks(filterDto, user);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    public async getTaskById(id: number, user: UserEntity): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({ where: { id, userId: user.id }});

        if (task) {
            return task;
        } else {
            throw new NotFoundException('Nie znaleziono obiektu w bazie danych');
        }
    }

    public async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }

    public async deleteTask(id: number, user: UserEntity): Promise<DeleteResult> {
        try {
            return await this.taskRepository.delete({ id, userId: user.id });
        } catch (e) {
            throw new NotFoundException(e);
        }
    }

    public async updateTaskStatus(id: number, status: TaskStatus, user: UserEntity): Promise<TaskEntity> {
        try {
            const task = await this.getTaskById(id, user);
            task.status = status;
            await task.save();
            return task;
        } catch (e) {
            throw new NotFoundException(e);
        }
    }
}
