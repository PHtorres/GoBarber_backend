import {ObjectID} from 'mongodb';
import INotificationsRepository from '../INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';
import ICreaeNotificationDTO from '../../dtos/ICreaeNotificationDTO';

export default class FakeNotificationsRepository implements INotificationsRepository {

    private notifications: Notification[] = [];

    public async create({ content, recipient_id }: ICreaeNotificationDTO): Promise<Notification> {
        const notification = new Notification();
        notification.content = content;
        notification.recipient_id = recipient_id;
        this.notifications.push(notification);
        return notification;
    }
}
