import { Router } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    const usersRepository = new UsersRepository();
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService(usersRepository);
    const { user, token } = await authenticateUser.execute({ email, password });
    return response.json({ user, token });

})

export default sessionsRouter;
