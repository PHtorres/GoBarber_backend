import { Router } from 'express';
import ProvidersController from '../Controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../Controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../Controllers/ProviderDayAvailabilityController';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default providersRouter;
