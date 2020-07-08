import { isAfter, addHours } from 'date-fns';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { injectable, inject } from 'tsyringe';

interface IRequestDTO {
    token: string;
    password: string;
}

@injectable()
export default class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ token, password }: IRequestDTO): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const compareDate = addHours(userToken.created_at, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}
