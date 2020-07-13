import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {

    beforeEach(()=>{
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to authenticate', async () => {

        const user = await createUserService.execute({
            name: 'fulanodetal',
            email: 'fulanodetal@gmail.com',
            password: '12345'
        });

        const response = await authenticateUserService.execute({
            email: 'fulanodetal@gmail.com',
            password: '12345'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });

    it('should not be able to authenticate with non existing user', async () => {

        await expect(authenticateUserService.execute({
            email: 'fulanodetal@gmail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {

        await createUserService.execute({
            name: 'fulanodetal',
            email: 'fulanodetal@gmail.com',
            password: '12345'
        });

        await expect(authenticateUserService.execute({
            email: 'fulanodetal@gmail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError);

    });
});
