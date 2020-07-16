
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';

import { getDaysInMonth, getDate } from 'date-fns';


interface IRequestDTO {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>


@injectable()
export default class ListProviderMonthAvailabilityService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({ provider_id, month, year }: IRequestDTO): Promise<IResponse> {

        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            month,
            year
        });

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(item => getDate(item.date) === day);

            return {
                day,
                available: appointmentsInDay.length < 10
            }
        });

        return availability;
    }
}