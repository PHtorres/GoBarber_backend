import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository:FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService:ResetPasswordService;


describe('ResetPassword', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        resetPasswordService = new ResetPasswordService(
                                             fakeUsersRepository,
                                             fakeUserTokensRepository);
    })

    it('should be able to reset the password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Paulo teste',
            email: 'teste@gmail.com',
            password: 'senhaqualquer'
        });

        const userToken = await fakeUserTokensRepository.generate(user.id);

        const novaSenha = 'novasenhaqualquer';

        await resetPasswordService.execute({
            token:userToken.token,
            password:novaSenha
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe(novaSenha);

    });

});
