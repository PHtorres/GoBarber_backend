import User from '../../users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../users/repositories/IUsersRepository';


interface IRequestDTO {
    user_id: string;
}

@injectable()
export default class ListProvidersService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(dados: IRequestDTO): Promise<User[]> {

        const users = await this.usersRepository.findAllProviders({exceptUserId:dados.user_id});

        return users;

    }
}
