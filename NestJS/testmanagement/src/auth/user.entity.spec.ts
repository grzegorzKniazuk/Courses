import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';

describe('User entity', () => {

    describe('validatePassword', () => {
        let user;

        beforeEach(() => {
            user = new UserEntity();
            user.password = 'testPassword';
            user.salt = 'testSalt';
            bcrypt.hash = jest.fn();
        });

        it('should return true as password is valid', async () => {
            bcrypt.hash.mockReturnValue('testPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();

            const result = await user.validatePassword('123456');

            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(true);
        });
        it('should return false as password is invalid', async () => {
            bcrypt.hash.mockReturnValue('wrong');
            expect(bcrypt.hash).not.toHaveBeenCalled();

            const result = await user.validatePassword('123456');

            expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
            expect(result).toEqual(false);
        });
    });
});
