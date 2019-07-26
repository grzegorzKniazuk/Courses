import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../shared/enums';
import { UserEntity } from '../auth/user.entity';

@Entity()
export class TaskEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public status: TaskStatus;

    @Column()
    public userId: number;

    @ManyToOne(type => UserEntity, userEntity => userEntity.tasks, { eager: false })
    public user: UserEntity;
}
