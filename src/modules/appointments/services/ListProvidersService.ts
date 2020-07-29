import User from '../../users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';


interface IRequestDTO {
    user_id: string;
}

@injectable()
export default class ListProvidersService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) { }

    public async execute(dados: IRequestDTO): Promise<User[]> {

        const cacheUsers = await this.cacheProvider.recover<User[]>(`providers-list:${dados.user_id}`);

        if(!cacheUsers){

            const users = await this.usersRepository.findAllProviders({ exceptUserId: dados.user_id });

            await this.cacheProvider.save(`providers-list:${dados.user_id}`, users);

            return users;
        }

        return cacheUsers;

    }
}
