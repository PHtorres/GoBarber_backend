import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailPrivider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository:FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailPrivider:FakeMailPrivider;
let sendForgotPasswordEmailService:SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeMailPrivider = new FakeMailPrivider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
                                             fakeUsersRepository,
                                             fakeMailPrivider,
                                             fakeUserTokensRepository);
    })

    it('should be able to recovery the password using the email', async () => {

        const sendMail = jest.spyOn(fakeMailPrivider, 'sendMail');
        await fakeUsersRepository.create({
            name: 'Paulo teste',
            email: 'teste@gmail.com',
            password: 'senhaqualquer'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();

    });

    it('should not be able to recover a non-existing user password', async () => {


        await expect(sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should generate a forgot password token', async () => {

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Paulo teste',
            email: 'teste@gmail.com',
            password: 'senhaqualquer'
        });

        await sendForgotPasswordEmailService.execute({
            email: 'teste@gmail.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);

    });
});
