import User from '../entities/User';
import UserToken from '../entities/UserToken';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import IUserTokensRepository from '../../../repositories/IUserTokenRepository';
import {getRepository, Repository} from 'typeorm';

class UserTokensRepository implements IUserTokensRepository {

    private ormRepository: Repository<UserToken>;

    constructor(){
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token:string):Promise<UserToken | undefined>{
        const userToken = await this.ormRepository.findOne({where:{token}});
        return userToken;
    }

    public async generate(user_id:string):Promise<UserToken>{
        const userToken = this.ormRepository.create({
            user_id
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
