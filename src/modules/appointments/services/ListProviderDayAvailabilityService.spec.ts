import AppError from '../../../shared/errors/AppError';
import FakeAppointmentsRepository from '../../appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
    })

    it('should be able to list the day availibility from provider', async () => {

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            date: new Date(2020, 4, 20, 8, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user1',
            date: new Date(2020, 4, 20, 10, 0, 0)
        });

        const availability = await listProviderDayAvailabilityService.execute({
            day: 20,
            month: 5,
            provider_id: 'user1',
            year: 2020
        });


        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: true },
            { hour: 10, available: false },
            { hour: 11, available: true },
        ]));

    });

});