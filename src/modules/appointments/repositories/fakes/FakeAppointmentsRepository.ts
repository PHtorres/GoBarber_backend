import {uuid} from 'uuidv4';
import {isEqual} from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import IAppointmenteRepository from '../IAppointmentsRepository';

class AppointmentsRepository implements IAppointmenteRepository {

    private appointments:Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
        return findAppointment;
    }

    public async create({date, provider_id}:ICreateAppointmentDTO):Promise<Appointment>{
        const appointment = new Appointment();
        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;
        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
