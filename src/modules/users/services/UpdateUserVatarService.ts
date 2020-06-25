import User from '../infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
    user_id: string;
    avatarFileName: string;
}


export default class UpdateUserAvatarService {

    constructor(private usersRepository: IUsersRepository) { }

    public async execute(dados: RequestDTO): Promise<User> {

        const user = await this.usersRepository.findById(dados.user_id);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar image', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = dados.avatarFileName;

        await this.usersRepository.save(user);

        return user;

    }
}
