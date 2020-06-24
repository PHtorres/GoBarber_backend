import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppoitmentService from '../../../services/CreateAppointmentService';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentsRepository = new AppointmentsRepository();

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find()
//     return response.json(appointments);
// });


appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppoitmentService(appointmentsRepository);
    const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });
    return response.json(appointment);
})

export default appointmentsRouter;
