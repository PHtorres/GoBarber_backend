import AppError from '../../../shared/errors/AppError';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserVatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
    })

    it('should be able to update user avatar', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Paulo Teste',
            email: 'pauloteste@gmail.com',
            password: 'umasenhaqualquer'
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'teste.png'
        });

        expect(user.avatar).toBe('teste.png');

    });

    it('should not be able to update avatar from non existing user', async () => {

        await expect(updateUserAvatarService.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'teste.png'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to update user avatar deleting old avatar', async () => {

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'Paulo Teste',
            email: 'pauloteste@gmail.com',
            password: 'umasenhaqualquer'
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'teste.png'
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFileName: 'teste2.png'
        });

        expect(deleteFile).toHaveBeenCalledWith('teste.png');
        expect(user.avatar).toBe('teste2.png');

    });
});
