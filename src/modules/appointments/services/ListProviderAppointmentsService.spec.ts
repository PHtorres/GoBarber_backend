import FakeAppointmentsRepository from '../../appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository);
    })

    it('should be able to list the provider appointments on a specific day', async () => {

        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'idprovider',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 14, 0, 0)
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'idprovider',
            user_id:'idusuario',
            date: new Date(2020, 4, 20, 15, 0, 0)
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id:'idprovider',
            year: 2020,
            month: 5,
            day: 20
        });

        expect(appointments).toEqual([appointment1, appointment2]);

    });

});
