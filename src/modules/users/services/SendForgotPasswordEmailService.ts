import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProider';
import { injectable, inject } from 'tsyringe';

interface IRequestDTO {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider:IMailProvider
    ) { }

    public async execute({ email }: IRequestDTO): Promise<void> {
        this.mailProvider.sendMail(email, 'Teste envio de e-mail');
    }
}
