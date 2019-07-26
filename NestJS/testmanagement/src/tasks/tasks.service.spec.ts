import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from '../shared/enums';

const mockUser = { username: 'Test user', id: 12 };
const mockTaskDto = { title: 'test task', description: 'test desc' };
const mockFilters = {
    status: TaskStatus.IN_PROGRESS,
    search: 'Some search query',
};

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
});

describe('TaskService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository },
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('get all tasks from repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const result = await tasksService.getTasks(mockFilters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');

        });
    });

    describe('getTaskById', () => {
        it('calls taskRepository.findOne() and succesffuly retrieve and return the task', async () => {

            taskRepository.findOne.mockResolvedValue(mockTaskDto);

            const result = await tasksService.getTaskById(1, mockUser);

            expect(result).toEqual(mockTaskDto);
            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 1,
                    userId: mockUser.id,
                },
            });
        });

        it('throws an error as task is not found', () => {
            taskRepository.findOne.mockResolvedValue(null);

            expect(tasksService.getTaskById(1, null)).rejects.toThrow();
        });
    });

    describe('createTask', () => {
        it('calls taskRepository.create() and return result ', async () => {
            taskRepository.createTask.mockResolvedValue('someTask');

            expect(taskRepository.createTask).not.toHaveBeenCalled();

            const result = await tasksService.createTask(mockTaskDto, mockUser);

            expect(taskRepository.createTask.toHaveBeenCalledWith(mockTaskDto, mockUser));
            expect(result).toEqual('someTask');
        });
    });

    describe('deleteTask', () => {
        it('calls taskRepository.deleteTask() to delete a task', async () => {
            taskRepository.delete.mockResolvedValue({ affected: 1 });

            expect(taskRepository.delete).not.toHaveBeenCalled();

            await taskRepository.delete({ id: 1, userId: mockUser.id });

            expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });
        });

        it('throws an error as task is not found', () => {
            taskRepository.delete.mockResolvedValue({ affected: 0 });

            expect(tasksService.deleteTask(null, mockUser)).rejects.toThrow();
        });
    });

    describe('updateTaskStatus', () => {
        it('updates a task status', async () => {
            const save = jest.fn().mockResolvedValue(true);

            tasksService.getTaskById = jest.fn().mockResolvedValue({
                status: TaskStatus.OPEN,
                save,
            });

            expect(tasksService.getTaskById).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();

            const result = await tasksService.updateTaskStatus(1, TaskStatus.DONE, mockUser);

            expect(tasksService.getTaskById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(TaskStatus.DONE);
        });
    });
});
