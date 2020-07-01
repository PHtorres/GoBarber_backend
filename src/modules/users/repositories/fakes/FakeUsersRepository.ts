import User from '../../infra/typeorm/entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';
import {uuid} from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {

    private users: User[] = [];

    public async findById(id: string):Promise<User | undefined>{
        const user = this.users.find(item => item.id === id);
        return user;
    }

    public async findByEmail(email: string):Promise<User | undefined>{
        const user = this.users.find(item => item.email === email);
        return user;
    }

    public async create({name, email, password}:ICreateUserDTO):Promise<User>{
        const user = new User();
        user.id = uuid();
        user.name = name;
        user.email = email;
        user.password = password;
        this.users.push(user);
        return user;
    }

    public async save(user:User):Promise<User>{
        const findIndex = this.users.findIndex(item => item. id === user.id);
        this.users[findIndex] = user;
        return user;
    }
}

export default FakeUsersRepository;
