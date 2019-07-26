import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { CreateTaskDto, GetTaskFilterDto } from './dto';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from '../shared/enums';
import { TaskStatusValidationPipe } from '../shared/pipes';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    private readonly logger = new Logger('TasksController');

    constructor(
        private readonly tasksService: TasksService,
    ) {
    }

    @Get()
    public getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto, @GetUser() user: UserEntity): Promise<TaskEntity[]> {
        this.logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);

        return this.tasksService.getTasks(filterDto, user);
    }

    @Get(':/id')
    public getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity): Promise<TaskEntity> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: UserEntity): Promise<TaskEntity> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete(':/id')
    public deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity): Promise<DeleteResult> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch(':/id/status')
    public updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus, @GetUser() user: UserEntity): Promise<TaskEntity> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
