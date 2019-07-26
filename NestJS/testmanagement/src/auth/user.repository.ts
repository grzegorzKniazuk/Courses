import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    public async signUp({ username, password }: AuthCredentialsDto): Promise<void> {

        const salt = await bcrypt.genSalt();

        const user = this.create();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (e) {
            if (e.code === '23505') { // duplicate error code
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    public async validateUserPassword({ username, password }: AuthCredentialsDto): Promise<string | null> {
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
