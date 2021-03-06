import AppError from '../../../shared/errors/AppError';
import FakeAppointmentsRepository from '../../appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
    })

    it('should be able to list the month availibility from provider', async () => {

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 8, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 9, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 10, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 11, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 12, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 13, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 14, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 15, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 16, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 17, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            user_id:'idusuario',
            date: new Date(2020, 4, 21, 8, 0, 0)
        });

        const availability = await listProviderMonthAvailabilityService.execute({
            month: 5,
            provider_id:'user1',
            year: 2020
        });


        expect(availability).toEqual(expect.arrayContaining([
            {day: 19, available: true},
            {day: 20, available: false},
            {day: 21, available: true},
            {day: 22, available: true},
        ]));

    });

});
