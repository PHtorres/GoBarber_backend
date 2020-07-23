import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserVatarService';
import { container } from 'tsyringe';
import {classToClass} from 'class-transformer';

export default class UserAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {

        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatar.execute(
            {
                user_id: request.user.id,
                avatarFileName: request.file.filename
            }
        );

        delete user.password;

        return response.json(classToClass(user));

    }

}
