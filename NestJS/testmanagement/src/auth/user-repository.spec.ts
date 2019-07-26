import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

const mockCredentialsDto = { username: 'TestUsername', password: 'testPassword' };

describe('UserRepository', () => {

    let userRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserRepository,
            ],
        }).compile();

        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('signUp', () => {
        let save;

        beforeEach(() => {
            save = jest.fn();
            userRepository.create = jest.fn().mockReturnValue({ save });
        });

        it('successfully signs up the user', () => {
            save.mockResolvedValue(undefined);

            expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
        });

        it('throws a conflict exception as username already exists', () => {
            save.mockResolvedValue({ code: '23505' });

            expect(userRepository.signUp(mockCredentialsDto)).rejects.not.toThrow(ConflictException);
        });

        it('throws a conflict exception as username already exists', () => {
            save.mockResolvedValue({ code: '12345' });

            expect(userRepository.signUp(mockCredentialsDto)).rejects.not.toThrow(InternalServerErrorException);
        });
    });

    describe('validateUserPassword', () => {
        let user;

        beforeEach(() => {
            userRepository.findOne = jest.fn();

            user = new UserEntity();
            user.username = 'TestUsername';
            user.validatePassword = jest.fn();
        });

       it('should returns the username as validation is successful', async () => {
            userRepository.findOne.mockResolvedValue(user);
            user.validateUserPassword.mockResolvedValue(true);

            const result = await userRepository.validateUserPassword(mockCredentialsDto);
            expect(result).toEqual('TestUsername');
       });

        it('should returns null as user cannot be found', async () => {
            userRepository.findOne.mockResolvedValue(null);

            const result = await userRepository.validateUserPassword(mockCredentialsDto);
            expect(user.validateUserPassword).not.toHaveBeenCalled();

            expect(result).toBeNull()
        });

        it('should returns null as password is invalid', async () => {
            userRepository.findOne.mockResolvedValue(user);
            user.validateUserPassword.mockResolvedValue(false);
            const result = await userRepository.validateUserPassword(mockCredentialsDto);

            expect(result).toBeNull()
        });
    });

    describe('hashPassword', () => {
        it('should call bcrypt.hash to generate a hash', async () => {
            bcrypt.hash = jest.fn().mockResolvedValue('testHash');

            expect(bcrypt.hash).not.toHaveBeenCalled();

            const result = await userRepository.hashPassword('testPassword', 'testSalt');

            expect(result).toEqual('testHash');
        });
    })
});
