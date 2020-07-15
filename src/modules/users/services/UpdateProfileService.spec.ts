import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    })

    it('should be able to update the profile', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Fulano da silva',
            email: 'fulanodasilva@gmail.com'
        });

        expect(updatedUser.name).toBe('Fulano da silva');
        expect(updatedUser.email).toBe('fulanodasilva@gmail.com');


    });

    it('should not be able to update a non-existing user profile', async () => {

        await expect(updateProfileService.execute({
            user_id: 'UmIdErrado',
            name:'teste',
            email:'teste@teste.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update the profile with another profile email', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        await fakeUsersRepository.create({
            name: 'Outro usuario',
            email: 'outrousuario@gmail.com',
            password: 'senhadooutrousuario'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Fulano da silva',
            email: 'outrousuario@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to update the password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Fulano da silva',
            email: 'fulanodasilva@gmail.com',
            old_password: 'senhadofulanodetal',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');


    });


    it('should not be able to update the password without old password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Fulano da silva',
            email: 'fulanodasilva@gmail.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);


    });


    it('should not be able to update the password without wrong old password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'Fulano da silva',
            email: 'fulanodasilva@gmail.com',
            old_password:'senhaerrada',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);


    });

});
