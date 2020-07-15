import User from '../infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';


interface IRequestDTO {
    user_id: string;
}

@injectable()
export default class ShowProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(dados: IRequestDTO): Promise<User> {

        const user = await this.usersRepository.findById(dados.user_id);

        if(!user){
            throw new AppError('User not found');
        }

        return user;

    }
}
