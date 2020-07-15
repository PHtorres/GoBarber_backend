import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfileService = new ShowProfileService(fakeUsersRepository);
    })

    it('should be able to show the profile', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Fulano de Tal',
            email: 'fulanodetal@gmail.com',
            password: 'senhadofulanodetal'
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('Fulano de Tal');
        expect(profile.email).toBe('fulanodetal@gmail.com');

    });

    it('should not be able to show a non-existing user profile', async () => {

        await expect(showProfileService.execute({
            user_id: 'UmIdErrado',
        })).rejects.toBeInstanceOf(AppError);

    });

});
