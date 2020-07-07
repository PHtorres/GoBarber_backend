import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUsersService.execute({
            name: 'fulano de tal',
            email: 'fulanodetal@gmail.com',
            password: '12345'
        });

        expect(user).toHaveProperty('id');

    });
    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUsersService.execute({
            name: 'fulano de tal',
            email: 'fulanodetal@gmail.com',
            password: '12345'
        });

        await expect(
            createUsersService.execute({
                name: 'fulano de tal',
                email: 'fulanodetal@gmail.com',
                password: '12345'
            })
        ).rejects.toBeInstanceOf(AppError);

    });
});
