
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import { getDaysInMonth, getDate } from 'date-fns';


interface IRequestDTO {
    provider_id: string;
    day:number;
    month: number;
    year: number;
}


@injectable()
export default class ListProviderAppointmentsService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({ provider_id, day, month, year }: IRequestDTO): Promise<Appointment[]> {

        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            day,
            month,
            year
        });

        return appointments;
    }
}
