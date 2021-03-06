import { Request, Response } from 'express';
import UpdateProfileService from '../../../services/UpdateProfileService';
import ShowProfileService from '../../../services/ShowProfileService';
import { container } from 'tsyringe';
import {classToClass} from 'class-transformer';

export default class ProfileController {

    public async show(request: Request, response: Response){
        const user_id = request.user.id;
        const showProfile = container.resolve(ShowProfileService);
        const profile = await showProfile.execute({user_id});
        return response.json(classToClass(profile));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;
        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password
        });

        return response.json(classToClass(user));
    }

}
