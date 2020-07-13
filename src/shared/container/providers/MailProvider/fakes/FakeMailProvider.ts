import IMailProvider from '../models/IMailProider';
import ISendMailDTO from '../DTO/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {

    private messages: ISendMailDTO[] = [];

    public async sendMail(data:ISendMailDTO): Promise<void> {
        this.messages.push(data);
    }
}
