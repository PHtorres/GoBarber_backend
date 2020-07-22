import Notification from '../infra/typeorm/schemas/Notification';
import ICreaeNotificationDTO from '../dtos/ICreaeNotificationDTO';

export default interface INotificationsRepository {
    create(data: ICreaeNotificationDTO): Promise<Notification>;
}
