import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileControler = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileControler.show);
profileRouter.put('/', profileControler.update);


export default profileRouter;
