import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
@Unique([ 'username' ])
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public salt: string;

    @OneToMany(type => TaskEntity, taskEntity => taskEntity.user, { eager: true })
    public tasks: TaskEntity[];

    public async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}
