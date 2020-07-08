import UserToken from '../../infra/typeorm/entities/UserToken';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUserTokensRepository from '../IUserTokenRepository';
import {uuid} from 'uuidv4';

class FakeUserTokensRepository implements IUserTokensRepository {

    private userTokens: UserToken[] = [];

    public async generate(user_id:string):Promise<UserToken>{

        const userToken = new UserToken();
        userToken.id = uuid();
        userToken.token = uuid();
        userToken.user_id = user_id;
        userToken.created_at = new Date();
        userToken.updated_at = new Date()

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token:string):Promise<UserToken | undefined>{
        const userToken = this.userTokens.find(item => item.token === token);
        return userToken;
    }
}

export default FakeUserTokensRepository;
