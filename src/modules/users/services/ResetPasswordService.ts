import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import { injectable, inject } from 'tsyringe';

interface IRequestDTO {
    token:string;
    password: string;
}

@injectable()
export default class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokenRepository')
        private userTokenRepository:IUserTokenRepository
    ) { }

    public async execute({ token, password }: IRequestDTO): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken){
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User does not exists');
        }

        user.password = password;

        await this.usersRepository.save(user);
    }
}
