import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;


describe('ResetPassword', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider);
    })

    it('should be able to reset the password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Paulo teste',
            email: 'teste@gmail.com',
            password: 'senhaqualquer'
        });

        const userToken = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        const novaSenha = 'novasenhaqualquer';

        await resetPasswordService.execute({
            token: userToken.token,
            password: novaSenha
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toBeCalledWith(novaSenha);
        expect(updatedUser?.password).toBe(novaSenha);

    });

    it('should not be able to reset password with non-existing token', async () => {

        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: 'senhaqualquer'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with non-existing user', async () => {

        const userToken = await fakeUserTokensRepository.generate('non-existing-user');

        await expect(
            resetPasswordService.execute({
                token: userToken.token,
                password: 'senhaqualquer'
            })
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able to reset password if it passed more than 2hrs', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Paulo teste',
            email: 'teste@gmail.com',
            password: 'senhaqualquer'
        });

        const userToken = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        })

        const novaSenha = 'novasenhaqualquer';

        await expect(
            resetPasswordService.execute({
                token: userToken.token,
                password: novaSenha
            })
        ).rejects.toBeInstanceOf(AppError);

    });

});
