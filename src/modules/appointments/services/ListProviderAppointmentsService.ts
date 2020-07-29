import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';


interface IRequestDTO {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}


@injectable()
export default class ListProviderAppointmentsService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async execute({ provider_id, day, month, year }: IRequestDTO): Promise<Appointment[]> {

        const cacheData = await this.cacheProvider.recover('chaveTeste');

        console.log('cacheData', cacheData);

        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            day,
            month,
            year
        });

        await this.cacheProvider.save('chaveTeste', JSON.stringify(appointments));

        return appointments;
    }
}
