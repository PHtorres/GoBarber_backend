import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { startOfHour, isBefore, getHours } from 'date-fns';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
    provider_id: string;
    user_id: string;
    date: Date
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({ provider_id, date, user_id }: IRequestDTO): Promise<Appointment> {

        if (provider_id === user_id) {
            throw new AppError('You can not create an appointment with yourself');
        }

        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError('You can not create an appointment on a past date');
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError('You can only create appointments between 8am and 5pm');
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment has already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id
        });

        return appointment;
    }
}

export default CreateAppointmentService;
