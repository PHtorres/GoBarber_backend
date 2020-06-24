import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IAppointmenteRepository from '../../../repositories/IAppointmentsRepository';
import {getRepository, Repository} from 'typeorm';

class AppointmentsRepository implements IAppointmenteRepository {

    private ormRepository: Repository<Appointment>;

    constructor(){
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined>{

        const findAppointment = await this.ormRepository.findOne({
            where:{date}
        });

        return findAppointment;
    }

    public async create({date, provider_id}:ICreateAppointmentDTO):Promise<Appointment>{
        const appointment = this.ormRepository.create({provider_id, date});
        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
