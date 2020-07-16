import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IAppointmenteRepository from '../../../repositories/IAppointmentsRepository';
import { getRepository, Repository, Raw } from 'typeorm';
import IFindAllInMonthFromProviderDTO from '../../../dtos/IFindAllInMonthFromProviderDTO';

class AppointmentsRepository implements IAppointmenteRepository {

    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = await this.ormRepository.findOne({
            where: { date }
        });

        return findAppointment;
    }

    public async findAllInMonthFromProvider({ provider_id, year, month }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
            }
        });

        return appointments;
    }

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });
        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
