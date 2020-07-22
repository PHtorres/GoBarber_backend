import INotificationsRepository from '../../../repositories/INotificationsRepository';
import Notification from '../schemas/Notification';
import ICreaeNotificationDTO from '../../../dtos/ICreaeNotificationDTO';
import { MongoRepository, getMongoRepository } from 'typeorm';

export default class NotificationsRepository implements INotificationsRepository {

    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id }: ICreaeNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({content,recipient_id});
        await this.ormRepository.save(notification);
        return notification;
    }
}
