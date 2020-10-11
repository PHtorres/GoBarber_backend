import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import IAppointmenteRepository from '../IAppointmentsRepository';
import IFindAllInMonthFromProviderDTO from '../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmenteRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date) &&
            appointment.provider_id === provider_id);
        return findAppointment;
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter(item =>
            item.provider_id === provider_id &&
            getMonth(item.date) + 1 === month &&
            getYear(item.date) === year);

        return appointments;
    }

    public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter(item =>
            item.provider_id === provider_id &&
            getDate(item.date) === day &&
            getMonth(item.date) + 1 === month &&
            getYear(item.date) === year);

        return appointments;
    }

    public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;
        appointment.user_id = user_id;
        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
