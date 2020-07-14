import User from '../infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface IRequestDTO {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}


@injectable()
export default class UpdateProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute(dados: IRequestDTO): Promise<User> {

        const user = await this.usersRepository.findById(dados.user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(dados.email);

        if (userWithUpdatedEmail) {
            if (userWithUpdatedEmail.id !== dados.user_id) {
                throw new AppError('E-mail already exists. Chose another one');
            }
        }

        if (dados.password && !dados.old_password) {
            throw new AppError('You need to send the old password to set a new password');
        }


        user.name = dados.name;
        user.email = dados.email;

        if (dados.password && dados.old_password) {

            const checkOldPassword = await this.hashProvider.compareHash(dados.old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }

            user.password = await this.hashProvider.generateHash(dados.password);
        }

        return this.usersRepository.save(user);

    }
}
