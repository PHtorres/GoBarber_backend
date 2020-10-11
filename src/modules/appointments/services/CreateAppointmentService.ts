import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '../../notifications/repositories/INotificationsRepository';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
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
        private appointmentsRepository: IAppointmentsRepository,
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository
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

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment has already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id
        });

        const formatedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para o dia ${formatedDate}`
        })

        return appointment;
    }
}

export default CreateAppointmentService;
