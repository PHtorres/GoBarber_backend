import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailPrivider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recovery the password using the email', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailPrivider = new FakeMailPrivider();

        const sendMail = jest.spyOn(fakeMailPrivider, 'sendMail');

        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailPrivider);

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
});
