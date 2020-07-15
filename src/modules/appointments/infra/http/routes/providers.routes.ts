import { Router } from 'express';
import ProvidersController from '../Controllers/ProvidersController';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const providersController = new ProvidersController();

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
