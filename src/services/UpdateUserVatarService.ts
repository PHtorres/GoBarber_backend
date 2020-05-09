import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';
import AppError from '../errors/AppError';

interface RequestDTO {
    user_id: string;
    avatarFileName: string;
}


export default class UpdateUserAvatarService {

    public async execute(dados: RequestDTO): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(dados.user_id);

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
        await userRepository.save(user);

        return user;

    }
}
