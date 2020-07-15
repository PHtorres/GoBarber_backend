import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersServive from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersServive: ListProvidersServive;

describe('List Providers', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProvidersServive = new ListProvidersServive(fakeUsersRepository);
    })

    it('should be able to list the providers', async () => {

        const user1 = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Beltrano de Tal',
            email: 'beltrano@gmail.com',
            password: 'senhadobeltrano'
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Usuario logado',
            email: 'usuariologado@gmail.com',
            password: 'senhadousuariologado'
        });

        const providers = await listProvidersServive.execute({ user_id: loggedUser.id });

        expect(providers).toEqual([user1, user2]);

    });

});
