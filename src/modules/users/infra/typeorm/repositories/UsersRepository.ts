import User from '../entities/User';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import IFindAllProvidersDTO from '../../../dtos/IFindAllProvidersDTO';
import {getRepository, Repository, Not} from 'typeorm';

class UsersRepository implements IUsersRepository {

    private ormRepository: Repository<User>;

    constructor(){
        this.ormRepository = getRepository(User);
    }

    public async findAllProviders({exceptUserId}:IFindAllProvidersDTO):Promise<User[]>{

        if(exceptUserId){
            return this.ormRepository.find({where:{id:Not(exceptUserId)}});
        }

        return this.ormRepository.find();
    }

    public async findById(id: string):Promise<User | undefined>{
        const user  = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string):Promise<User | undefined>{
        const user = await this.ormRepository.findOne({where:{email}});
        return user;
    }

    public async create({name, email, password}:ICreateUserDTO):Promise<User>{
        const user = this.ormRepository.create({name, email, password});
        await this.ormRepository.save(user);
        return user;
    }

    public async save(user:User):Promise<User>{
        return await this.ormRepository.save(user);
    }
}

export default UsersRepository;
