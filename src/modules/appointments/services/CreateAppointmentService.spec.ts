import AppError from '../../../shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeNotificationsRepository from '../../notifications/repositories/fakes/FakeNotificationsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {

    beforeEach(() => {
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository);
    })

    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'idusuario',
            provider_id: '123456'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });


    it('should not be able to create two appointments on the same time', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointmentDate = new Date(2020, 4, 10, 13);

        await createAppointmentService.execute({
            date: appointmentDate,
            user_id: 'idusuario',
            provider_id: '123456'
        });

        await expect(createAppointmentService.execute({
            date: appointmentDate,
            user_id: 'idusuario',
            provider_id: '123456'
        })).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able to create an appointment on a past date time', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointmentService.execute({
            date: new Date(2020, 4, 10, 11),
            user_id: 'idusuario',
            provider_id: '123456'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointmentService.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'idusuario',
            provider_id: 'idusuario'
        })).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able to create an appointment before 8an and after 5pm', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(createAppointmentService.execute({
            date: new Date(2020, 4, 11, 7),
            user_id: 'idusuario',
            provider_id: 'idprovider'
        })).rejects.toBeInstanceOf(AppError);

        await expect(createAppointmentService.execute({
            date: new Date(2020, 4, 11, 18),
            user_id: 'idusuario',
            provider_id: 'idprovider'
        })).rejects.toBeInstanceOf(AppError);
    });


});
